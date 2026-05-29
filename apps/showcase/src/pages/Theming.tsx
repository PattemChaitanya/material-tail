import React from 'react';
// @ts-ignore
import { Box } from '../components/ui/Box';
import { SEO } from '../components/SEO';

export const Theming = () => {
  return (
    <>
      <SEO 
        title="Theming - Material-Tail" 
        description="Learn how to customize the theme, colors, and border radiuses of Material-Tail components."
      />
      <Box style={{ padding: "48px 48px", maxWidth: "900px", margin: "0 auto", animation: "fadeIn 0.3s ease" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "16px", color: "var(--text-primary)", letterSpacing: "-0.04em" }}>Theming</h1>
      <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", marginBottom: "48px", lineHeight: "1.6" }}>
        Material-Tail uses an advanced CSS variable-based architecture that enables you to dynamically theme your entire application in real time.
      </p>

      <div style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", fontWeight: "600", color: "var(--text-primary)" }}>Global Theme Variables</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.6" }}>
          You can override global styles by targeting the <code>:root</code> selector in your main CSS file. Because components use variables natively, everything updates instantly.
        </p>
        
        <div style={{ background: "#1e1e1e", borderRadius: "12px", overflow: "hidden", padding: "16px 20px", marginTop: "16px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <pre style={{ color: "#a5d6a7", fontFamily: "monospace", fontSize: "0.95rem", margin: 0 }}>
{`:root {
  --primary: #8b5cf6;
  --primary-hover: #7c3aed;
  
  --radius-md: 8px;
  --font-family: 'Outfit', sans-serif;
}`}
          </pre>
        </div>
      </div>
      
      <div style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", fontWeight: "600", color: "var(--text-primary)" }}>Dark Mode Support</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.6" }}>
          Material-Tail has first-class dark mode support. Simply add the <code>.dark</code> class to your root HTML element or body to trigger it. 
        </p>
      </div>
    </Box>
    </>
  );
};
