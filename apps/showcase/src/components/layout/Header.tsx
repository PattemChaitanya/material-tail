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

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  const [tempColor, setTempColor] = useState("#1976d2");

  const handleApplyTheme = () => {
    // Dynamically inject the new primary color into the root CSS variables
    document.documentElement.style.setProperty("--primary", tempColor);
    
    // Calculate subtle and hover manually if CSS color-mix isn't supported, 
    // but our CSS heavily uses color-mix(in srgb, var(--primary) 12%, transparent) 
    // so we ONLY need to update --primary and the browser handles the rest!
    
    setThemeDialogOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: "var(--background-paper, #fff)", color: "var(--text-primary)", borderBottom: "1px solid var(--border-color)", boxShadow: "none" }}>
        <Toolbar>
          <Button variant="text" onClick={onMenuClick} style={{ minWidth: "48px", padding: "8px", marginRight: "16px" }} className="mobile-menu-btn">
            <Menu size={24} />
          </Button>
          
          <Flex align="center" gap={12} style={{ flexGrow: 1 }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, var(--primary), var(--secondary))" }}></div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: 0 }}>Material-Tail</h1>
          </Flex>

          <Flex gap={8}>
            <Tooltip title="Toggle Theme" placement="bottom">
              <Button 
                variant="ghost" 
                onClick={() => {
                  document.documentElement.classList.toggle('dark');
                  // For a real app, we might also save this to localStorage
                }} 
                style={{ padding: "8px", minWidth: "48px" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              </Button>
            </Tooltip>
            <Tooltip title="Customize Theme" placement="bottom">
              <Button variant="ghost" onClick={() => setThemeDialogOpen(true)} style={{ padding: "8px", minWidth: "48px" }}>
                <Palette size={20} />
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
