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

export const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", maxWidth: "1600px", margin: "0 auto" }}>
      
      {/* 1. The Header Entity */}
      <Box style={{ padding: "16px 24px 0 24px" }}>
        <Header onMenuClick={() => setMobileOpen(true)} />
      </Box>
      
      {/* Drawer for Mobile Sidebar */}
      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Sidebar onNavClick={() => setMobileOpen(false)} />
      </Drawer>

      <Flex style={{ flexGrow: 1, padding: "16px 24px 24px 24px", gap: "24px", alignItems: "flex-start" }}>
        {/* 2. The Sidebar Entity */}
        <Box 
          className="desktop-sidebar" 
          style={{ 
            width: "280px", 
            flexShrink: 0, 
            height: "calc(100vh - 120px)", /* accounting for header + padding */
            position: "sticky", 
            top: "16px",
            background: "rgba(20, 24, 30, 0.6)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 16px 40px -8px rgba(0,0,0,0.4)",
            overflowY: "auto" 
          }}
        >
          <Sidebar onNavClick={() => {}} />
        </Box>

        {/* 3. The Main Content Entity (Transparent) */}
        <Box style={{ flexGrow: 1, minWidth: 0 }}>
          <Outlet />
        </Box>
      </Flex>
    </div>
  );
};
