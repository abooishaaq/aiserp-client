const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
    swcMinify: true,
});

module.exports = nextConfig;
