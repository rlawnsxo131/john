import type { Config } from 'jest';

const config: Config = {
  projects: [
    '<rootDir>/example/jest.config.js',
    '<rootDir>/packages/*/.jest.config.js',
  ],
};

export default config;
