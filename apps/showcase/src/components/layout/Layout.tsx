import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
// @ts-ignore
import { Box } from "../ui/Box";
// @ts-ignore
import { Flex } from "../ui/Flex";
// @ts-ignore
import { Drawer } from "../ui/Drawer";
import { CommandPalette } from "./CommandPalette";

export const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", maxWidth: "1600px", margin: "0 auto", overflow: "hidden" }}>
      
      {/* 1. The Header Entity */}
      <Box style={{ padding: "16px 24px 0 24px", flexShrink: 0 }}>
        <Header onMenuClick={() => setMobileOpen(true)} />
      </Box>
      
      {/* Drawer for Mobile Sidebar */}
      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Sidebar onNavClick={() => setMobileOpen(false)} />
      </Drawer>

      <Flex style={{ flexGrow: 1, padding: "16px 24px 24px 24px", gap: "24px", alignItems: "flex-start", overflow: "hidden" }}>
        {/* 2. The Sidebar Entity */}
        <Box 
          className="desktop-sidebar" 
          style={{ 
            width: "280px", 
            flexShrink: 0, 
            height: "100%", 
            background: "var(--glass-bg)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "16px",
            border: "1px solid var(--glass-border)",
            boxShadow: "var(--glass-shadow)",
            overflowY: "auto" 
          }}
        >
          <Sidebar onNavClick={() => {}} />
        </Box>

        {/* 3. The Main Content Entity (Transparent) */}
        <Box style={{ flexGrow: 1, minWidth: 0, height: "100%", overflowY: "auto", borderRadius: "16px" }}>
          <Outlet />
        </Box>
      </Flex>
      {/* Command Palette Overlay */}
      <CommandPalette />
    </div>
  );
};
