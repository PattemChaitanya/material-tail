import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { docsConfig } from "../../data/docsConfig";
// @ts-ignore
import { Box } from "../ui/Box";

interface SearchResult {
  id: string;
  title: string;
  category: string;
  matchField: string;
  snippet: string;
  score: number;
}

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle global keyboard shortcuts and custom events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Deep Search Algorithm
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const newResults: SearchResult[] = [];

    Object.values(docsConfig).forEach((doc) => {
      // Helper to find matches and create snippets
      const checkField = (fieldValue: string, fieldName: string, weight: number) => {
        if (!fieldValue) return;
        const index = fieldValue.toLowerCase().indexOf(q);
        if (index !== -1) {
          // Create snippet (20 chars before, 40 after)
          const start = Math.max(0, index - 20);
          const end = Math.min(fieldValue.length, index + q.length + 40);
          let snippet = fieldValue.substring(start, end).replace(/\n/g, ' ');
          if (start > 0) snippet = "..." + snippet;
          if (end < fieldValue.length) snippet = snippet + "...";

          newResults.push({
            id: doc.id,
            title: doc.title,
            category: doc.category,
            matchField: fieldName,
            snippet,
            score: weight
          });
        }
      };

      // Weighting: Title (100) > Description (80) > Usage (50) > Customization (40) > Install (20)
      checkField(doc.title, "Title", 100);
      checkField(doc.description, "Description", 80);
      checkField(doc.usage, "Usage Code", 50);
      checkField(doc.customization, "CSS", 40);
      checkField(doc.install, "Installation", 20);
    });

    // Group by component ID and keep only the highest scoring match per component
    const bestMatches = new Map<string, SearchResult>();
    newResults.forEach((res) => {
      const existing = bestMatches.get(res.id);
      if (!existing || existing.score < res.score) {
        bestMatches.set(res.id, res);
      }
    });

    // Sort by score
    const sorted = Array.from(bestMatches.values()).sort((a, b) => b.score - a.score);
    setResults(sorted);
    setSelectedIndex(0);
  }, [query]);

  // Handle local keyboard navigation within the palette
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && results.length > 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  const handleSelect = (result: SearchResult) => {
    navigate(`/docs/${result.id}`);
    setIsOpen(false);
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "15vh"
      }}
      onClick={() => setIsOpen(false)}
    >
      <div 
        style={{
          width: "100%", maxWidth: "600px",
          background: "var(--glass-bg)",
          backdropFilter: "blur(32px)",
          border: "1px solid var(--glass-border)",
          borderRadius: "12px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
          display: "flex", flexDirection: "column",
          overflow: "hidden"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid var(--border-color)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "12px" }}>
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            style={{
              flex: 1,
              background: "transparent", border: "none",
              color: "var(--text-primary)", fontSize: "1.1rem",
              outline: "none"
            }}
          />
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", background: "var(--background-subtle)", padding: "2px 6px", borderRadius: "4px" }}>
            ESC
          </div>
        </div>

        {results.length > 0 && (
          <div ref={listRef} style={{ maxHeight: "400px", overflowY: "auto", padding: "8px 0" }}>
            {results.map((result, idx) => (
              <div
                key={result.id}
                onClick={() => handleSelect(result)}
                onMouseEnter={() => setSelectedIndex(idx)}
                style={{
                  padding: "12px 24px",
                  cursor: "pointer",
                  background: idx === selectedIndex ? "var(--action-hover)" : "transparent",
                  display: "flex", flexDirection: "column", gap: "4px",
                  borderLeft: idx === selectedIndex ? "3px solid var(--primary)" : "3px solid transparent"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{result.title}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>{result.matchField}</span>
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {/* Highlight the match roughly */}
                  {result.snippet.split(new RegExp(`(${query})`, 'gi')).map((part, i) => 
                    part.toLowerCase() === query.toLowerCase() ? 
                      <span key={i} style={{ color: "var(--primary)", fontWeight: "bold" }}>{part}</span> : part
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {query && results.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>
            No results found for "{query}"
          </div>
        )}
        
        {!query && (
          <div style={{ padding: "16px 24px", fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", background: "var(--background-subtle)" }}>
            <span>Search for components, props, CSS, or examples</span>
            <span>Use <kbd style={{ fontFamily: "monospace", padding: "2px 4px", background: "var(--background-paper)", borderRadius: "4px" }}>↑↓</kbd> to navigate, <kbd style={{ fontFamily: "monospace", padding: "2px 4px", background: "var(--background-paper)", borderRadius: "4px" }}>Enter</kbd> to select</span>
          </div>
        )}
      </div>
    </div>
  );
};
