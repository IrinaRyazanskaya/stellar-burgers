import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}]
  },
  moduleNameMapper: {
    '^@pages$': '<rootDir>/src/pages',
    '^@ui$': '<rootDir>/src/components/ui',
    '^@slices$': '<rootDir>/src/services/slices',
    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@selectors$': '<rootDir>/src/services/selectors',
    '^@ui-pages$': '<rootDir>/src/components/ui/pages'
  },
  collectCoverageFrom: [
    '!src/**/*.d.ts',
    'src/**/*.{ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html']
};

export default config;
