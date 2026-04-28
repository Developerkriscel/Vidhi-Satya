import { mkdir } from "node:fs/promises";
import path from "node:path";

const uploadDir = path.join(process.cwd(), "public", "uploads");

await mkdir(uploadDir, { recursive: true });
console.log(`[prepare:uploads] ensured ${uploadDir}`);
