import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Default is 1MB, too small for admin-uploaded photos (pastor photo,
      // ministry image, gallery image, post cover) routed through a Server
      // Action so requireAdmin() gates uploads the same way as every other
      // mutation.
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
