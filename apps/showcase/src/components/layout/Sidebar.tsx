import React from "react";
import { Link, useLocation } from "react-router-dom";
import { docsConfig } from "../../data/docsConfig";
// @ts-ignore
import { List, ListItem, ListItemText } from "../ui/List";
// @ts-ignore
import { Box } from "../ui/Box";

interface SidebarProps {
  onNavClick?: () => void;
}

export const Sidebar = ({ onNavClick }: SidebarProps) => {
  const location = useLocation();

  // Group components by category
  const categories: Record<string, any[]> = {};
  Object.values(docsConfig).forEach((doc) => {
    if (!categories[doc.category]) {
      categories[doc.category] = [];
    }
    categories[doc.category].push(doc);
  });

  return (
    <Box style={{ padding: "16px 0" }}>
      <div style={{ padding: "0 24px", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-secondary)", margin: 0 }}>
          Getting Started
        </h3>
        <List>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem 
              button 
              selected={location.pathname === "/"}
              onClick={onNavClick}
              style={{ borderRadius: "var(--radius-md)", marginBottom: "4px" }}
            >
              <ListItemText primary="Introduction" />
            </ListItem>
          </Link>
        </List>
      </div>

      {Object.entries(categories).map(([category, items]) => (
        <div key={category} style={{ padding: "0 24px", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-secondary)", margin: "8px 0" }}>
            {category}
          </h3>
          <List>
            {items.map((item) => (
              <Link key={item.id} to={`/docs/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem 
                  button 
                  selected={location.pathname === `/docs/${item.id}`}
                  onClick={onNavClick}
                  style={{ borderRadius: "var(--radius-md)", marginBottom: "4px" }}
                >
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      ))}
    </Box>
  );
};
