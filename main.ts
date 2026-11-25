// Deterministic entrypoint for Tuesday 24 November 2026 World News frontpage (Node 22 stdlib only).
// Copies the verified 1024x1024 editorial PNG image to /output/entry.png.
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(new URL('./entry.png', import.meta.url), join(outDir, 'entry.png'));
