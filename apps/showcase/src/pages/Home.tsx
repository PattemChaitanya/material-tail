import React from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import { Box } from "../components/ui/Box";
// @ts-ignore
import { Button } from "../components/ui/Button";

export const Home = () => {
  return (
    <Box style={{ padding: "80px 40px", maxWidth: "800px", margin: "0 auto", textAlign: "center", color: "var(--text-primary)" }}>
      <div style={{ width: "80px", height: "80px", margin: "0 auto 32px", borderRadius: "20px", background: "linear-gradient(135deg, var(--primary), var(--primary-foreground-subtle, #90caf9))", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}></div>
      <h1 style={{ fontSize: "4rem", fontWeight: "900", marginBottom: "24px", letterSpacing: "-0.04em", lineHeight: "1.1" }}>
        Build Beautiful UIs. <br />
        <span style={{ background: "linear-gradient(to right, var(--primary), var(--primary-foreground-subtle, #90caf9))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Own your code.</span>
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
