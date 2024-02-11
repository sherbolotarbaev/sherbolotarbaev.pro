/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "cqyhpkpfgerxvsbdnguj.supabase.co",
      "localhost:3000",
      "pnghive.com",
      "storage.googleapis.com",
      "cdn-images-1.medium.com",
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    return config;
  },
};

module.exports = nextConfig;
