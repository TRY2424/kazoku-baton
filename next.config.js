/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  // エリアページは中身がなかったため削除した(2026-10)。古いURLはジャンル一覧へ
  async redirects() {
    return [
      { source: "/areas", destination: "/categories", permanent: true },
      { source: "/areas/:slug", destination: "/categories", permanent: true },
    ];
  },
};

module.exports = nextConfig;
