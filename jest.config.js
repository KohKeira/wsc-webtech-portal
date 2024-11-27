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
};
