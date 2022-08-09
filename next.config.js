const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer(withPWA({
    swcMinify: true,
    pwa: {
        dest: "public",
		register: false,
		skipWaiting: true,
		runtimeCaching,
        disable: process.env.NODE_ENV === "development",
    },
}));

module.exports = nextConfig;
