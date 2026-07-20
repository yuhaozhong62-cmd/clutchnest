import { rm } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = join(projectRoot, "out");
const internalOutput = join(outputRoot, "internal");
const relativeTarget = relative(outputRoot, internalOutput);

if (!relativeTarget || relativeTarget.startsWith("..") || isAbsolute(relativeTarget)) {
  throw new Error("Refusing to remove a static export path outside out/.");
}

await rm(internalOutput, { recursive: true, force: true });
