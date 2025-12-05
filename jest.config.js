export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/tests/**/*.test.ts"],
    setupFiles: ["dotenv/config"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
}