module.exports = {
    extends: [
      "react-app",
      "react-app/jest"
    ],
    env: {
      browser: true,
      es2021: true,
      node: true
    },
    globals: {
      NODE_ENV: true
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 12,
      sourceType: "module"
    },
    plugins: [
      "react"
    ],
    rules: {
    }
  };
  