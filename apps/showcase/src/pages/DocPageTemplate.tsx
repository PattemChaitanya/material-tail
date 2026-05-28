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
const LazyPlayground = ({ children, title = "Playground" }: { children: React.ReactNode, title?: string }) => {
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
        padding: "1px", // Gradient border thickness
        borderRadius: "16px",
        background: "linear-gradient(135deg, rgba(20, 184, 166, 0.8), rgba(139, 92, 246, 0.8))",
        boxShadow: "0 8px 32px -4px rgba(20,184,166,0.2), 0 8px 32px -4px rgba(139,92,246,0.2)",
        minHeight: "360px",
      }}
      className="playground-wrapper"
    >
      <div style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--background-paper, #171a21)",
        borderRadius: "15px", // Slightly smaller than wrapper to fit inside border
        height: "100%",
        overflow: "hidden"
      }}>
        {/* Playground Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>{title}</span>
          <div style={{ display: "flex", gap: "12px", color: "var(--text-secondary)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path><path d="M12 2v2"></path><path d="M12 22v-2"></path><path d="m17 20.66-1-1.73"></path><path d="M11 5.07 10 3.34"></path><path d="m20.66 17-1.73-1"></path><path d="m3.34 7 1.73 1"></path><path d="M14 12h8"></path><path d="M2 12h2"></path><path d="m20.66 7-1.73 1"></path><path d="m3.34 17 1.73-1"></path><path d="m17 3.34-1 1.73"></path><path d="m11 18.93-1 1.73"></path></svg>
          </div>
        </div>

        {/* Playground Body */}
        <div style={{ display: "flex", flexGrow: 1 }}>
          {/* Left: Preview */}
          <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px", background: "linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)" }}>
            {isVisible ? children : <div style={{ color: "var(--text-secondary)", animation: "pulse 2s infinite" }}>Loading playground...</div>}
          </div>
          
          {/* Right: Mock Props Panel */}
          <div style={{ width: "260px", borderLeft: "1px solid rgba(255,255,255,0.05)", padding: "20px", display: "flex", flexDirection: "column", gap: "16px", background: "rgba(0,0,0,0.2)" }}>
            {[
              { label: "Variant", val: "Default" },
              { label: "Size", val: "Medium" },
              { label: "Color", val: "Primary" },
              { label: "Disabled", val: "No" },
              { label: "Loading", val: "No" }
            ].map((prop, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{prop.label}</span>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", fontSize: "0.85rem", minWidth: "100px", color: "var(--text-primary)" }}>
                  {prop.val}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "8px", opacity: 0.5 }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Code Block Wrapper
const CodeBlock = ({ language, code, title }: { language: string, code: string, title?: string }) => (
  <div style={{ background: "#1e222a", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden", marginTop: "16px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", background: "rgba(0,0,0,0.2)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontFamily: "monospace" }}>{title || language}</span>
      <button style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </button>
    </div>
    <SyntaxHighlighter 
      language={language} 
      style={vscDarkPlus} 
      customStyle={{ margin: 0, padding: "20px", background: "transparent", fontSize: "0.9rem", lineHeight: "1.5" }}
      showLineNumbers={language === 'tsx'}
    >
      {code}
    </SyntaxHighlighter>
  </div>
);

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
    <Box style={{ padding: "40px", maxWidth: "840px", margin: "0 auto", color: "var(--text-primary)" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "12px", fontWeight: "800", letterSpacing: "-0.03em" }}>{doc.title}</h1>
      <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginBottom: "40px", lineHeight: "1.6" }}>
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
        <h2 style={{ fontSize: "1.5rem", marginBottom: "8px", fontWeight: "600", letterSpacing: "-0.02em" }}>Installation</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "12px" }}>Run the following command to add the component to your project:</p>
        <CodeBlock language="bash" code={doc.install} title="bash" />
      </div>

      <div style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "8px", fontWeight: "600", letterSpacing: "-0.02em" }}>Usage</h2>
        <CodeBlock language="tsx" code={doc.usage} title="jsx" />
      </div>

      <div style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "8px", fontWeight: "600", letterSpacing: "-0.02em" }}>Customization</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "12px" }}>
          Because you own the code, you can jump straight into the generated CSS Module to customize it.
        </p>
        <CodeBlock language="css" code={doc.customization} title="css" />
      </div>
    </Box>
  );
};
