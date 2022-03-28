module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "airbnb-typescript/base"
  ],
  root: true,
  plugins: ["@typescript-eslint"],
  env: {
    "browser": true,
    "es6": true
  },
  rules: {
    "arrow-body-style": 0,
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": false
      }
    ],
    "import/prefer-default-export": "off",
    "no-console": "off",
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-unused-vars": [
        "error", { "argsIgnorePattern": "^_" }
    ],
     "@typescript-eslint/no-explicit-any": 1,
    "no-case-declarations": 0
  },
  ignorePatterns: [".eslintrc.js", "test", "dist"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module"
  }
}