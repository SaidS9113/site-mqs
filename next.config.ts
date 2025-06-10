import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.pexels.com",      // vous pouvez garder celui-ci si vous l'utilisez ailleurs
      "source.unsplash.com",    // permet d'utiliser des images dynamiques d'Unsplash
      "images.unsplash.com"     // certaines URLs d'Unsplash passent aussi par ce domaine
    ],
  },
};

export default nextConfig;
