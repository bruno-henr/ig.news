// module.exports = {
//     testPathIgnorePatterns: ['/node_modules/', '/.next/'],
//     setupFilesAfterEnv: [
//         '<rootDir>/src/tests/setTests.ts'
//     ],
//     transform: {
//         "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
//     },
//     testEnvironment: 'jest-environment-jsdom'
// }
/** @type {import('jest').Config} */
const config = {
    verbose: true,
    
    testEnvironment: "jsdom"
};

module.exports = config;