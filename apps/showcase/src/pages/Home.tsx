import React from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import { Box } from "../components/ui/Box";
// @ts-ignore
import { Button } from "../components/ui/Button";

export const Home = () => {
  return (
    <Box style={{ padding: "80px 40px", maxWidth: "800px", margin: "0 auto", textAlign: "center", color: "var(--text-primary)" }}>
      <div style={{ width: "80px", height: "80px", margin: "0 auto 32px", borderRadius: "16px", background: "linear-gradient(135deg, var(--primary), var(--secondary))" }}></div>
      <h1 style={{ fontSize: "3.5rem", fontWeight: "900", marginBottom: "24px", letterSpacing: "-0.02em" }}>
        Build Beautiful UIs. <br />
        <span style={{ color: "var(--primary)" }}>Own your code.</span>
      </h1>
      <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", marginBottom: "48px", lineHeight: "1.6" }}>
        Material-Tail is a headless, fully customizable component library heavily inspired by shadcn/ui, 
        but built on top of robust, scoped <strong>CSS Modules</strong> rather than Tailwind CSS.
      </p>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        <Link to="/docs/button" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" size="large">
            Get Started
          </Button>
        </Link>
        <a href="https://github.com/PattemChaitanya/material-tail" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" color="primary" size="large">
            GitHub
          </Button>
        </a>
      </div>
    </Box>
  );
};
