/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  testEnvironment: 'node',
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/coverage/"],
  projects: [
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ["**/*/server.test.js"]
    },
    /** */
    {
      displayName: 'client',
      testEnvironment: "jsdom",
      testMatch: ["**/components/**/*.test.[jt]s?(x)"],
    }
    /**/
  ],
};
