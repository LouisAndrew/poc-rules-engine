import configPrettier from "eslint-config-prettier";
import confitPrettierTs from "eslint-config-prettier/@typescript-eslint";

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": [
      1,
      {
        trailingComma: "es5",
        singleQuote: true,
        semi: false,
      },
    ],
    ...configPrettier.rules,
    ...confitPrettierTs.rules,
  },
};
