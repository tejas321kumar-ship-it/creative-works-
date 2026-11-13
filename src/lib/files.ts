import fs from "node:fs";
import path from "node:path";

// Build-time check: true when a file exists in /public. Used to hide links to files not yet supplied.
export const publicFileExists = (url: string) => fs.existsSync(path.join(process.cwd(), "public", url));
