import fs from "fs";
import { glob } from "glob";

glob("src/**/*.d.ts", function (er, files) {
  if (er) {
    console.error(er);
    return;
  }
  // Assuming the files are sorted in ascending order and the last one is the one you need
  const lastFilePath = files[files.length - 1];
  const destPath = "dist/type.d.ts";

  if (lastFilePath) {
    fs.copyFileSync(lastFilePath, destPath);
    console.log(`Copied ${lastFilePath} to ${destPath}`);
  }
});
