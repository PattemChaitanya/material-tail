import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import App from '../src/App';

const PORT = process.env.PORT || 3001;
const app = express();

app.use((req, res, next) => {
  console.log(`[GLOBAL] Received request: ${req.method} ${req.url}`);
  next();
});

// Serve static assets from the build directory
app.use(express.static(path.resolve(__dirname, '..', 'build'), { index: false }));

app.use((req, res, next) => {
  console.log(`[SSR] Incoming request for: ${req.url}`);
  const context = {};
  const helmetContext = {};

  try {
    console.log(`[SSR] Rendering App to string...`);
    // Render the App as a string
    const appMarkup = ReactDOMServer.renderToString(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    );
    console.log(`[SSR] App rendered successfully. Length: ${appMarkup.length}`);

    const { helmet } = helmetContext;

    // Read the index.html from build folder
    const indexFile = path.resolve(__dirname, '..', 'build', 'index.html');
    console.log(`[SSR] Reading index file: ${indexFile}`);
    
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('[SSR] Something went wrong reading index.html:', err);
        return res.status(500).send('Oops, better luck next time!');
      }

      console.log(`[SSR] Injecting SEO and App markup...`);
      // Inject the SEO metadata from Helmet
      const headMarkup = `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      `;
      let responseHtml = data.replace(
        '<head>',
        `<head>${headMarkup}`
      );

      // Inject the App markup
      responseHtml = responseHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${appMarkup}</div>`
      );

      console.log(`[SSR] Sending HTML response.`);
      return res.send(responseHtml);
    });
  } catch (error) {
    console.error(`[SSR] FATAL ERROR during render:`, error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SSR server listening on port ${PORT}`);
});
