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
          {(() => {
            const isActive = location.pathname === "/";
            return (
              <Link to="/" style={{ textDecoration: 'none', color: isActive ? '#fff' : 'var(--text-secondary)' }}>
                <ListItem 
                  button 
                  selected={isActive}
                  onClick={onNavClick}
                  style={{ 
                    position: "relative",
                    borderRadius: "6px", 
                    marginBottom: "4px",
                    padding: "8px 16px",
                    fontWeight: isActive ? "600" : "400",
                    background: isActive ? "linear-gradient(90deg, rgba(20, 184, 166, 0.15) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 100%)" : "transparent"
                  }}
                >
                  {isActive && (
                    <div style={{
                      position: "absolute",
                      left: 0,
                      top: "10%",
                      height: "80%",
                      width: "3px",
                      borderRadius: "0 4px 4px 0",
                      background: "linear-gradient(to bottom, #14b8a6, #8b5cf6)",
                      boxShadow: "0 0 10px rgba(20,184,166,0.5)"
                    }}></div>
                  )}
                  <ListItemText primary="Introduction" />
                </ListItem>
              </Link>
            );
          })()}
        </List>
      </div>

      {Object.entries(categories).map(([category, items]) => (
        <div key={category} style={{ padding: "0 24px", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-secondary)", margin: "8px 0" }}>
            {category}
          </h3>
          <List>
            {items.map((item) => {
              const isActive = location.pathname === `/docs/${item.id}`;
              return (
                <Link key={item.id} to={`/docs/${item.id}`} style={{ textDecoration: 'none', color: isActive ? '#fff' : 'var(--text-secondary)' }}>
                  <ListItem 
                    button 
                    selected={isActive}
                    onClick={onNavClick}
                    style={{ 
                      position: "relative",
                      borderRadius: "6px", 
                      marginBottom: "4px",
                      padding: "8px 16px",
                      fontWeight: isActive ? "600" : "400",
                      background: isActive ? "linear-gradient(90deg, rgba(20, 184, 166, 0.15) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 100%)" : "transparent",
                    }}
                  >
                    {isActive && (
                      <div style={{
                        position: "absolute",
                        left: 0,
                        top: "10%",
                        height: "80%",
                        width: "3px",
                        borderRadius: "0 4px 4px 0",
                        background: "linear-gradient(to bottom, #14b8a6, #8b5cf6)",
                        boxShadow: "0 0 10px rgba(20,184,166,0.5)"
                      }}></div>
                    )}
                    <ListItemText primary={item.title} />
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </div>
      ))}
    </Box>
  );
};
