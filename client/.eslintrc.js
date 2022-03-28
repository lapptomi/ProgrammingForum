module.exports = {
  env: {
    "browser": true,
    "es6": true,
    "jest": true
  },
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-typescript"
  ],
  plugins: ["react", "@typescript-eslint"],
  settings: {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  rules: {
    "semi": [2, "always"],
    "react/prop-types": 0,
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/explicit-function-return-type": 0,
    "import/extensions": ["error", "ignorePackages", {
      "ts": "never",
      "tsx": "never",
      "js": "never",
      "jsx": "never",
      "mjs": "never"
    }]
  },
  ignorePatterns: [".eslintrc.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module"
  }
}