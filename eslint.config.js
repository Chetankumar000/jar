const js = require("@eslint/js");
const globals = require("globals");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const reactRefresh = require("eslint-plugin-react-refresh");

module.exports = {
  ignorePatterns: ["dist"], // Use ignorePatterns instead of 'ignores'
  overrides: [
    {
      files: ["**/*.{js,jsx}"],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parserOptions: {
          ecmaVersion: "latest",
          ecmaFeatures: { jsx: true },
          sourceType: "module",
        },
      },
      settings: {
        react: {
          version: "detect", // Automatically detect React version
        },
      },
      plugins: {
        react,
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh,
      },
      rules: {
        ...js.configs.recommended.rules,
        ...react.configs.recommended.rules,
        ...react.configs["jsx-runtime"].rules,
        ...reactHooks.configs.recommended.rules,
        "react/jsx-no-target-blank": "off",
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
      },
    },
  ],
};
