import React, { useState } from "react";
import styles from "./Avatar.module.css";
import { cp } from "../../../lib/utils";

export type AvatarVariant = "circular" | "rounded" | "square";
export type AvatarColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  srcSet?: string;
  variant?: AvatarVariant;
  color?: AvatarColor;
}

const defaultIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.defaultIcon}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      srcSet,
      variant = "circular",
      color = "default",
      children,
      ...props
    },
    ref
  ) => {
    const [hasError, setHasError] = useState(false);

    const hasImage = src || srcSet;
    const hasImageAndNoError = hasImage && !hasError;

    return (
      <div
        ref={ref}
        data-variant={variant}
        data-color={color}
        className={cp(styles.avatar, className)}
        {...props}
      >
        {hasImageAndNoError ? (
          <img
            src={src}
            alt={alt}
            srcSet={srcSet}
            className={styles.image}
            onError={() => setHasError(true)}
          />
        ) : children != null ? (
          children
        ) : (
          defaultIcon
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
