import type { ConfigContext, ExpoConfig } from "expo/config";

const project = {
  owner: "riolly",
  slug: "beloved-one",
  id: "87543a2c-05d6-484d-ad72-be4af9b8aad8",
};

export const getBranchName = (separator: string): string =>
  process.env.BRANCH_NAME?.replace(/[^\w\s]/g, separator) // Replace non-alphanumeric
    .replace(/\s+/g, separator) // Replace whitespace
    .toLowerCase() || "";

const vars = {
  name: {
    development: "BelovedOne (Dev)",
    preview: `BelovedOne (${getBranchName(" ")})`,
    production: "BelovedOne",
  },
  identifier: {
    development: "com.belovedone.dev",
    preview: `com.belovedone.prev.${getBranchName("_")}`,
    production: "com.belovedone",
  },
  apiUrl: {
    development: "http://localhost:3000",
    preview: `https://beloved-one-git-${getBranchName("-")}-riolly-projects.vercel.app`,
    production: "https://www.yourbeloved.one",
  },
};

function getEnv(variable: keyof typeof vars) {
  const variant =
    (process.env.BUILD_TARGET as "development" | "preview" | "production") ??
    "development";
  return vars[variable][variant];
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getEnv("name"),
  owner: project.owner,
  slug: project.slug,
  scheme: project.slug,
  version: process.env.npm_package_version,
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#fff1f2",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: getEnv("identifier"),
    supportsTablet: true,
  },
  android: {
    package: getEnv("identifier"),
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#fff1f2",
    },
  },
  extra: {
    eas: {
      projectId: project.id,
    },
    apiUrl: getEnv("apiUrl"),
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: ["expo-router"],
});
