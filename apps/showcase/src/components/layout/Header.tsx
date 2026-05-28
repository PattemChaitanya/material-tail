import React, { useState } from "react";
// @ts-ignore
import { AppBar, Toolbar } from "../ui/AppBar";
// @ts-ignore
import { Button } from "../ui/Button";
// @ts-ignore
import { Flex } from "../ui/Flex";
// @ts-ignore
import { Dialog, DialogTitle, DialogContent, DialogActions } from "../ui/Dialog";
// @ts-ignore
import { Tooltip } from "../ui/Tooltip";
import { Palette, Menu } from "lucide-react";

import { applyThemeColor } from "../../lib/colorUtils";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  const [tempColor, setTempColor] = useState("#1976d2");

  const handleApplyTheme = () => {
    // Dynamically inject the new primary color and its generated shades
    applyThemeColor(tempColor);
    setThemeDialogOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: "rgba(18, 18, 18, 0.8)", color: "var(--text-primary)", borderBottom: "1px solid rgba(255,255,255,0.08)", boxShadow: "none", backdropFilter: "blur(12px)", zIndex: 1200 }}>
        <Toolbar style={{ padding: "0 24px", minHeight: "64px" }}>
          <Button variant="text" onClick={onMenuClick} style={{ minWidth: "48px", padding: "8px", marginRight: "16px" }} className="mobile-menu-btn">
            <Menu size={24} />
          </Button>
          
          <Flex align="center" gap={12} style={{ marginRight: "48px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, var(--primary), var(--primary-foreground-subtle, #90caf9))", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: "18px" }}>M</div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: "700", margin: 0, letterSpacing: "-0.02em" }}>Material-Tail</h1>
          </Flex>

          <Flex align="center" gap={24} style={{ flexGrow: 1 }} className="desktop-nav">
            <a href="#" style={{ color: "var(--text-primary)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, padding: "6px 12px", borderRadius: "6px", backgroundColor: "var(--action-hover)" }}>Docs</a>
            <a href="#" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>Components</a>
            <a href="#" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>Themes</a>
          </Flex>

          <Flex gap={16} align="center">
            <a href="https://github.com/PattemChaitanya/material-tail" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>
              GitHub
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>

            <div style={{ display: "flex", alignItems: "center", background: "var(--input-filled-bg)", borderRadius: "8px", padding: "6px 12px", width: "240px", border: "1px solid var(--border-color)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" placeholder="Search documentation..." style={{ background: "transparent", border: "none", color: "var(--text-primary)", outline: "none", width: "100%", fontSize: "0.9rem" }} />
            </div>

            <Tooltip title="Toggle Theme" placement="bottom">
              <Button 
                variant="ghost" 
                onClick={() => {
                  const root = document.documentElement;
                  const isDark = root.classList.contains('dark') || 
                                 (window.matchMedia('(prefers-color-scheme: dark)').matches && !root.classList.contains('light'));
                  
                  if (isDark) {
                    root.classList.remove('dark');
                    root.classList.add('light');
                  } else {
                    root.classList.remove('light');
                    root.classList.add('dark');
                  }
                }} 
                style={{ padding: "8px", minWidth: "40px" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              </Button>
            </Tooltip>
            <Tooltip title="Customize Theme" placement="bottom">
              <Button variant="ghost" onClick={() => setThemeDialogOpen(true)} style={{ padding: "8px", minWidth: "40px" }}>
                <Palette size={18} />
              </Button>
            </Tooltip>
          </Flex>
        </Toolbar>
      </AppBar>

      <Dialog open={themeDialogOpen} onClose={() => setThemeDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Customize Theme</DialogTitle>
        <DialogContent>
          <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
            Select a new primary color. Our CSS Variables architecture will automatically recalculate all hover states, active states, and glowing borders instantly.
          </p>
          <Flex align="center" gap={16} justify="center">
            <input 
              type="color" 
              value={tempColor} 
              onChange={(e) => setTempColor(e.target.value)} 
              style={{
                width: "80px",
                height: "80px",
                padding: "0",
                border: "none",
                borderRadius: "var(--radius-lg)",
                cursor: "pointer",
                backgroundColor: "transparent"
              }}
            />
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", fontFamily: "monospace" }}>
              {tempColor.toUpperCase()}
            </div>
          </Flex>
        </DialogContent>
        <DialogActions>
          <Button variant="text" color="primary" onClick={() => setThemeDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleApplyTheme}>Apply Color</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
