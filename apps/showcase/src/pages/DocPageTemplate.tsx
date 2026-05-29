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
const LazyPlayground = ({ config, componentName }: { config: any, componentName: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  const [propsState, setPropsState] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (config?.controls) {
      config.controls.forEach((c: any) => {
        initial[c.name] = c.defaultValue;
      });
    }
    return initial;
  });

  useEffect(() => {
    const initial: Record<string, string> = {};
    if (config?.controls) {
      config.controls.forEach((c: any) => {
        initial[c.name] = c.defaultValue;
      });
    }
    setPropsState(initial);
  }, [config]);

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

  const handleCopy = () => {
    const propsString = Object.entries(propsState)
      .filter(([_, value]) => value !== "false" && value !== "")
      .map(([key, value]) => (value === "true" ? key : `${key}="${value}"`))
      .join(" ");
    
    const codeString = `<${componentName}${propsString ? ' ' + propsString : ''} />`;
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!config) return null;

  return (
    <div ref={domRef} className="playground-wrapper">
      <div className="playground-glass">
        {/* Playground Header */}
        <div className="playground-header">
          <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>Playground</span>
          <div style={{ display: "flex", gap: "12px", color: "var(--text-secondary)" }}>
            <button onClick={handleCopy} className="playground-copy-btn" title="Copy Code">
              {copied ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              )}
            </button>
          </div>
        </div>

        {/* Playground Body */}
        <div className="playground-body">
          {/* Left: Preview */}
          <div className="playground-preview">
            {isVisible && config.component ? <config.component {...propsState} /> : <div style={{ color: "var(--text-secondary)", animation: "pulse 2s infinite" }}>Loading playground...</div>}
          </div>
          
          {/* Right: Interactive Props Panel */}
          <div className="playground-panel">
            {config.controls?.map((control: any) => (
              <div key={control.name} className="playground-control-row">
                <span className="playground-control-label">{control.name}</span>
                <select 
                  className="playground-control-select"
                  value={propsState[control.name]} 
                  onChange={(e) => setPropsState(prev => ({ ...prev, [control.name]: e.target.value }))}
                >
                  {control.options.map((opt: string) => (
                    <option key={opt} value={opt} style={{ background: "var(--background-paper)" }}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Code Block Wrapper
const CodeBlock = ({ language, code, title }: { language: string, code: string, title?: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: "#1e1e1e", borderRadius: "12px", overflow: "hidden", marginTop: "16px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", background: "#2d2d2d", borderBottom: "1px solid #404040" }}>
        <span style={{ fontSize: "0.8rem", color: "#a3a3a3", fontFamily: "monospace" }}>{title || language}</span>
        <button onClick={handleCopy} style={{ background: "transparent", border: "none", color: "#a3a3a3", cursor: "pointer", display: "flex", alignItems: "center", padding: "4px" }}>
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          )}
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
};

import { SEO } from "../components/SEO";

export const DocPageTemplate = () => {
  const { componentId } = useParams<{ componentId: string }>();
  
  const doc = docsConfig[componentId || ""];
  const demoConfig = DemoRegistry[componentId as keyof typeof DemoRegistry];

  if (!doc) {
    return (
      <Box style={{ padding: "48px 24px", color: "var(--text-secondary)" }}>
        <SEO title="Component Not Found - Material-Tail" description="The requested component documentation does not exist." />
        <h2>Component not found</h2>
        <p>The documentation for "{componentId}" does not exist.</p>
      </Box>
    );
  }

  return (
    <>
      <SEO 
        title={`${doc.title} Component - Material-Tail`} 
        description={doc.description} 
      />
      <Box className="doc-page-container">
      <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "16px", color: "var(--text-primary)", letterSpacing: "-0.04em" }}>{doc.title}</h1>
      <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", marginBottom: "48px", lineHeight: "1.6" }}>{doc.description}</p>
      
      {demoConfig && (
        <div style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", fontWeight: "600", letterSpacing: "-0.02em" }}>Interactive Playground</h2>
          <LazyPlayground config={demoConfig} componentName={doc.title} />
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
    </>
  );
};
