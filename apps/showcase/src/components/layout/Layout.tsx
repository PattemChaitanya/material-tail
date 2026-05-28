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
    <Box style={{ minHeight: "100vh", backgroundColor: "var(--background-default)" }}>
      {/* Fixed Header */}
      <Header onMenuClick={() => setMobileOpen(true)} />

      <Flex style={{ paddingTop: "64px" /* height of header */ }}>
        {/* Desktop Sidebar (Hidden on small screens) */}
        <Box 
          style={{ 
            width: "280px", 
            flexShrink: 0, 
            height: "calc(100vh - 64px)",
            position: "sticky",
            top: "64px",
            borderRight: "1px solid var(--border-color)",
            overflowY: "auto",
            display: "block" // We can hide via CSS media queries if we had standard global css for utility classes, but we will rely on drawer for mobile.
          }}
          className="desktop-sidebar"
        >
          <Sidebar />
        </Box>

        {/* Mobile Sidebar (Drawer) */}
        <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
          <Box style={{ width: "280px", paddingTop: "16px" }}>
            <Sidebar onNavClick={() => setMobileOpen(false)} />
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box style={{ flexGrow: 1, minWidth: 0 }}>
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};
