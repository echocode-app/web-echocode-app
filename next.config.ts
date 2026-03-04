import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true" && Boolean(repoName);
const basePath = isGithubPagesBuild && repoName ? `/${repoName}` : "";
const formspreeProdEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT_PROD || "";
const formspreeDefaultEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || formspreeProdEndpoint;
const formspreeDevEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT_DEV || formspreeDefaultEndpoint;

const nextConfig: NextConfig = {
  output: "export",
  turbopack: {
    root: __dirname,
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_FORMSPREE_ENDPOINT_PROD: formspreeProdEndpoint,
    NEXT_PUBLIC_FORMSPREE_ENDPOINT: formspreeDefaultEndpoint,
    NEXT_PUBLIC_FORMSPREE_ENDPOINT_DEV: formspreeDevEndpoint,
  },
};

export default nextConfig;
