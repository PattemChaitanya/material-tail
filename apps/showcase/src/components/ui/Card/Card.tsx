import React from "react";
import styles from "./Card.module.css";
import { cp } from "../../../lib/utils";
import { Paper, PaperProps } from "../Paper";

// ==========================================
// Card Component
// ==========================================
export interface CardProps extends PaperProps {
  raised?: boolean;
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, raised = false, interactive = false, ...props }, ref) => {
    return (
      <Paper 
        ref={ref} 
        data-raised={raised || undefined}
        data-interactive={interactive || undefined}
        className={cp(styles.card, className)} 
        {...props} 
      />
    );
  }
);
Card.displayName = "Card";

// ==========================================
// CardContent Component
// ==========================================
export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cp(styles.cardContent, className)} {...props} />;
  }
);
CardContent.displayName = "CardContent";

// ==========================================
// CardActions Component
// ==========================================
export const CardActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cp(styles.cardActions, className)} {...props} />;
  }
);
CardActions.displayName = "CardActions";

// ==========================================
// CardMedia Component
// ==========================================
export interface CardMediaProps extends React.HTMLAttributes<HTMLElement> {
  component?: React.ElementType;
  image?: string;
  src?: string;
}

export const CardMedia = React.forwardRef<HTMLElement, CardMediaProps>(
  ({ className, component: Component = "div", image, src, style, ...props }, ref) => {
    const isMediaComponent = ["video", "audio", "picture", "iframe", "img"].includes(Component as string);
    const mediaStyle = !isMediaComponent && image ? { backgroundImage: `url("${image}")`, ...style } : style;
    
    return (
      <Component
        ref={ref}
        className={cp(styles.cardMedia, isMediaComponent ? styles.cardMediaMedia : undefined, className)}
        style={mediaStyle}
        src={isMediaComponent ? (image || src) : undefined}
        {...props}
      />
    );
  }
);
CardMedia.displayName = "CardMedia";
