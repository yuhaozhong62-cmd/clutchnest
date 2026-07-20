const isStaticExport =
  process.env.CLUTCHNEST_STATIC_EXPORT === "1" ||
  process.env.npm_lifecycle_event === "build:static";

if (isStaticExport) process.env.CLUTCHNEST_STATIC_EXPORT = "1";

/** @type {import('next').NextConfig} */
const nextConfig = isStaticExport
  ? {
      output: "export",
      trailingSlash: true,
      images: {
        unoptimized: true
      }
    }
  : {};

export default nextConfig;
