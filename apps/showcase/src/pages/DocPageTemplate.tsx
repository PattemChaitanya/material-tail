import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { docsConfig } from "../data/docsConfig";
import { DemoRegistry } from "../components/demos";
// @ts-ignore
import { Box } from "../components/ui/Box";
// @ts-ignore
import { Flex } from "../components/ui/Flex";

// Lazy loading wrapper for playgrounds
const LazyPlayground = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={domRef} 
      style={{ 
        minHeight: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid var(--border-color, rgba(255,255,255,0.1))",
        borderRadius: "var(--radius-lg, 8px)",
        padding: "40px",
        background: "var(--background-subtle, rgba(255,255,255,0.02))",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)" // Glassmorphism touch
      }}
    >
      {isVisible ? children : <div style={{ color: "var(--text-secondary)" }}>Loading playground...</div>}
    </div>
  );
};

export const DocPageTemplate = () => {
  const { componentId } = useParams<{ componentId: string }>();
  
  if (!componentId || !docsConfig[componentId]) {
    return (
      <Box style={{ padding: "40px", color: "var(--text-primary)" }}>
        <h2>Component not found</h2>
        <p>The component "{componentId}" does not exist in our registry.</p>
      </Box>
    );
  }

  const doc = docsConfig[componentId];
  const DemoComponent = DemoRegistry[componentId];

  return (
    <Box style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", color: "var(--text-primary)" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "8px", fontWeight: "bold" }}>{doc.title}</h1>
      <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "32px" }}>
        {doc.description}
      </p>

      {DemoComponent && (
        <div style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", fontWeight: "600" }}>Playground</h2>
          <LazyPlayground>
            {DemoComponent}
          </LazyPlayground>
        </div>
      )}

      <div style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", fontWeight: "600" }}>Installation</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "12px" }}>Run the following command to add the component to your project:</p>
        <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ borderRadius: "8px", padding: "16px" }}>
          {doc.install}
        </SyntaxHighlighter>
      </div>

      <div style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", fontWeight: "600" }}>Usage</h2>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: "8px", padding: "16px" }}>
          {doc.usage}
        </SyntaxHighlighter>
      </div>

      <div style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", fontWeight: "600" }}>Customization</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "12px" }}>
          Because you own the code, you can jump straight into the generated CSS Module to customize it.
        </p>
        <SyntaxHighlighter language="css" style={vscDarkPlus} customStyle={{ borderRadius: "8px", padding: "16px" }}>
          {doc.customization}
        </SyntaxHighlighter>
      </div>
    </Box>
  );
};
