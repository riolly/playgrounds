import baseConfig, { restrictEnvAccess } from "@playground/eslint-config/base";
import nextjsConfig from "@playground/eslint-config/nextjs";
import reactConfig from "@playground/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
