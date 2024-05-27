#!/usr/bin/env node

import { platform, arch } from "process";
import {} from "node:fs";

const supportedTargets = [
  "windows-arm64",
  "linux-x64",
  "darwin-arm64",
  "windows-x64",
  "darwin-x64",
  "linux-arm64",
];
const main = async (): Promise<void> => {
  const target = `${platform}-${arch}`;
  if (!supportedTargets.find((t) => t === target)) {
    throw new Error(`unsupported target: ${target}`);
  }

  const packageName = `@goisaki/hono-kit-${target}`;

  try {
    const targetPackage = require.resolve(packageName);
    console.log(`Package ${packageName} exists and is ready.`);
  } catch (err) {
    console.log(`Target: ${target}`);
    console.log(`Package ${packageName} does not exist.`);
  }
};

main();
