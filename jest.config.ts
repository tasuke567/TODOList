// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  testMatch: [
    "**/?(*.)+(spec|test).[tj]s?(x)",  // หาทั้ง .test.ts, .spec.tsx ฯลฯ ทุกโฟลเดอร์
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",        // ถ้าคุณใช้ alias "@/..."
  },
};
export default config;
