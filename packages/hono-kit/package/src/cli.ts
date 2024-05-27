#!/usr/bin/env node

import { platform, arch } from "process";
import {} from "node:fs";

const targets: { target: string; url: string }[] = [
  {
    target: "darwin-x64",
    url: "${darwin-x64-url}",
  },
];
const main = async (): Promise<void> => {
  const target = `${platform}-${arch}`;
  if (!targets.find((t) => t.target === target)) {
    throw new Error(`unsupported target: ${target}`);
  }
};

main();
