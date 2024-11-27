export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },

    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '^.+\\.svg$': 'jest-transformer-svg',
        '^@/(.*)$': '<rootDir>/resources/js/$1',
    },

    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

    coverageDirectory: 'build/coverage/unit',

    collectCoverageFrom: ['resources/js/Pages/Users/*.{ts,tsx}'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
};
