import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['media.beehiiv.com', 'img.clerk.com'],
    },
    experimental: {
        // Remove: globalNotFound
        // Add supported experimental flags if needed
    }
};

export default nextConfig;
