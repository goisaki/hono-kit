#!/usr/bin/env node
/** Based on orhun/packaging-rust-for-npm. Thanks so much. */

import { spawnSync } from "child_process";
import { platform, arch, argv, exit } from "process";
import { resolve } from "path";

const getExePath = () => {
  const os =
    platform === "win32" || platform === "cygwin" ? "windows" : platform;
  const extension = os === "windows" ? ".exe" : "";

  try {
    return resolve(`hono-kit-${os}-${arch}/bin/hono-kit${extension}`);
  } catch {
    throw new Error(
      `Couldn't find application binary inside node_modules for ${os}-${arch}`
    );
  }
};

const run = () => {
  const args = argv.slice(2);
  const { status } = spawnSync(getExePath(), args, { stdio: "inherit" });
  exit(status ?? 0);
};

run();
