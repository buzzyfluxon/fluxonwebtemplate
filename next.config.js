await import("./src/env.js");
import WithPWA from "next-pwa";

const withPWA = WithPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/",
  sw: "service-worker.js",
});

const config = withPWA({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  allowedDevOrigins: ["*"],
});

export default config;
