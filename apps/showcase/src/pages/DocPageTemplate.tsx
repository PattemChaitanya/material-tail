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
const LazyPlayground = ({ config, title = "Playground" }: { config: any, title?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
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

  if (!config) return null;

  return (
    <div 
      ref={domRef} 
      style={{ 
        padding: "1px", // Gradient border thickness
        borderRadius: "16px",
        background: "linear-gradient(135deg, rgba(20, 184, 166, 0.8), rgba(139, 92, 246, 0.8))",
        boxShadow: "0 8px 32px -4px rgba(20,184,166,0.2), 0 8px 32px -4px rgba(139,92,246,0.2)",
        minHeight: "360px",
        display: "flex",
        flexDirection: "column",
      }}
      className="playground-wrapper"
    >
      <div style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--background-paper)",
        borderRadius: "15px", // Slightly smaller than wrapper to fit inside border
        flexGrow: 1,
        overflow: "hidden"
      }}>
        {/* Playground Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid var(--border-color)" }}>
          <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>{title}</span>
          <div style={{ display: "flex", gap: "12px", color: "var(--text-secondary)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path><path d="M12 2v2"></path><path d="M12 22v-2"></path><path d="m17 20.66-1-1.73"></path><path d="M11 5.07 10 3.34"></path><path d="m20.66 17-1.73-1"></path><path d="m3.34 7 1.73 1"></path><path d="M14 12h8"></path><path d="M2 12h2"></path><path d="m20.66 7-1.73 1"></path><path d="m3.34 17 1.73-1"></path><path d="m17 3.34-1 1.73"></path><path d="m11 18.93-1 1.73"></path></svg>
          </div>
        </div>

        {/* Playground Body */}
        <div style={{ display: "flex", flexGrow: 1 }}>
          {/* Left: Preview */}
          <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px", background: "rgba(255,255,255,0.02)" }}>
            {isVisible && config.component ? <config.component {...propsState} /> : <div style={{ color: "var(--text-secondary)", animation: "pulse 2s infinite" }}>Loading playground...</div>}
          </div>
          
          {/* Right: Interactive Props Panel */}
          <div style={{ width: "260px", borderLeft: "1px solid var(--border-color)", padding: "20px", display: "flex", flexDirection: "column", gap: "16px", background: "var(--background-subtle)" }}>
            {config.controls?.map((control: any) => (
              <div key={control.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", textTransform: "capitalize" }}>{control.name}</span>
                <select 
                  value={propsState[control.name]} 
                  onChange={(e) => setPropsState(prev => ({ ...prev, [control.name]: e.target.value }))}
                  style={{ 
                    padding: "6px 12px", 
                    background: "var(--input-filled-bg)", 
                    border: "1px solid var(--border-color)", 
                    borderRadius: "6px", 
                    fontSize: "0.85rem", 
                    minWidth: "110px", 
                    color: "var(--text-primary)",
                    outline: "none",
                    cursor: "pointer"
                  }}
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
    <div style={{ background: "var(--background-paper)", borderRadius: "12px", border: "1px solid var(--border-color)", overflow: "hidden", marginTop: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", background: "var(--background-subtle)", borderBottom: "1px solid var(--border-color)" }}>
        <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontFamily: "monospace" }}>{title || language}</span>
        <button onClick={handleCopy} style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", padding: "4px" }}>
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

export const DocPageTemplate = () => {
  const { componentId } = useParams<{ componentId: string }>();
  
  const doc = docsConfig[componentId || ""];
  const demoConfig = DemoRegistry[componentId as keyof typeof DemoRegistry];

  if (!doc) {
    return (
      <Box style={{ padding: "48px 24px", color: "var(--text-secondary)" }}>
        <h2>Component not found</h2>
        <p>The documentation for "{componentId}" does not exist.</p>
      </Box>
    );
  }

  return (
    <Box style={{ padding: "48px 48px", maxWidth: "900px", margin: "0 auto", animation: "fadeIn 0.3s ease" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "16px", color: "var(--text-primary)", letterSpacing: "-0.04em" }}>{doc.title}</h1>
      <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", marginBottom: "48px", lineHeight: "1.6" }}>{doc.description}</p>
      
      {demoConfig && (
        <div style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", fontWeight: "600", letterSpacing: "-0.02em" }}>Interactive Playground</h2>
          <LazyPlayground config={demoConfig} />
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
