import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  name?: string;
}

export const SEO = ({ 
  title = "Material-Tail - Modern React UI Library", 
  description = "A powerful, accessible, and highly customizable UI component library for React, merging the best of Material Design with the utility-first flexibility of Tailwind.",
  type = "website",
  name = "Material-Tail"
}: SEOProps) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph tags for Facebook, LinkedIn, etc. */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Search Engine Optimization */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};
