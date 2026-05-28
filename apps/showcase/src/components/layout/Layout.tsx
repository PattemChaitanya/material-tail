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
    <div className="app-window">
      <Header onMenuClick={() => setMobileOpen(true)} />
      
      {/* Drawer for Mobile Sidebar */}
      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Sidebar onNavClick={() => setMobileOpen(false)} />
      </Drawer>

      <Flex style={{ flexGrow: 1, overflow: "hidden" }}>
        {/* Desktop Sidebar */}
        <Box className="desktop-sidebar" style={{ width: "240px", flexShrink: 0, borderRight: "1px solid var(--border-color)", overflowY: "auto" }}>
          <Sidebar onNavClick={() => {}} />
        </Box>

        {/* Main Content Area */}
        <Box style={{ flexGrow: 1, overflowY: "auto", position: "relative" }}>
          <Outlet />
        </Box>
      </Flex>
    </div>
  );
};
