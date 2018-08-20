module.exports = {
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
    },
    setupFiles: [
        '<rootDir>/test/setup2.js',
    ],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{spec.js}'],
    "coverageReporters": ["json", "html"]
};