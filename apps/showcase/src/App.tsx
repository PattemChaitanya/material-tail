import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { DocPageTemplate } from "./pages/DocPageTemplate";

import { Installation } from "./pages/Installation";
import { Theming } from "./pages/Theming";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="docs/:componentId" element={<DocPageTemplate />} />
        <Route path="installation" element={<Installation />} />
        <Route path="theming" element={<Theming />} />
      </Route>
    </Routes>
  );
}

export default App;
