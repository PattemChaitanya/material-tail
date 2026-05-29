import React from 'react';
// @ts-ignore
import { Box } from '../components/ui/Box';
import { SEO } from '../components/SEO';

export const Installation = () => {
  return (
    <>
      <SEO 
        title="Installation - Material-Tail" 
        description="Learn how to install and setup Material-Tail in your React project in seconds."
      />
      <Box style={{ padding: "48px 48px", maxWidth: "900px", margin: "0 auto", animation: "fadeIn 0.3s ease" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "16px", color: "var(--text-primary)", letterSpacing: "-0.04em" }}>Installation</h1>
        <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", marginBottom: "48px", lineHeight: "1.6" }}>
          Learn how to install and setup material-tail in your React project.
        </p>

        <div style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", fontWeight: "600", color: "var(--text-primary)" }}>Quick Start</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.6" }}>
            Run the following command to add our components to your project. This CLI will seamlessly drop the required files directly into your workspace.
          </p>
        
        <div style={{ background: "#1e1e1e", borderRadius: "12px", overflow: "hidden", padding: "16px 20px", marginTop: "16px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <code style={{ color: "#a5d6a7", fontFamily: "monospace", fontSize: "0.95rem" }}>npx @material-tail/cli init</code>
        </div>
      </div>
      
      <div style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", fontWeight: "600", color: "var(--text-primary)" }}>Adding Components</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.6" }}>
          Once initialized, you can add individual components on demand. They are completely yours to own and customize.
        </p>
        
        <div style={{ background: "#1e1e1e", borderRadius: "12px", overflow: "hidden", padding: "16px 20px", marginTop: "16px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <code style={{ color: "#a5d6a7", fontFamily: "monospace", fontSize: "0.95rem" }}>npx @material-tail/cli add button</code>
        </div>
      </div>
    </Box>
    </>
  );
};
