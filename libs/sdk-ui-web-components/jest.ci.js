// (C) 2020 GoodData Corporation
/* eslint-disable @typescript-eslint/no-var-requires */
const ciBase = require("../../common/config/jest/jest.config.ci.base.js");

module.exports = {
    ...ciBase,
    testPathIgnorePatterns: ["/node_modules/", "/esm/"],
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
