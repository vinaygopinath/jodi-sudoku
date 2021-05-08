// jest.config.ts
import "jest-extended"
import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  setupFilesAfterEnv: ["jest-extended"]
};
export default config
