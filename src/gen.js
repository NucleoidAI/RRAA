import fs from "fs";
import { execSync } from "child_process";

const arr = ["0", "1"];

fs.writeFileSync("test.rraa", "");

while (arr.length) {
  const next = arr.shift();

  const buffer = Buffer.alloc(Math.ceil(next.length / 8));

  for (let i = 0; i < next.length; i += 8) {
    const string = next.substring(i, i + 8);
    buffer[i / 8] = parseInt(string, 2);
  }

  fs.rmSync("test.rraa");
  fs.writeFileSync("test.rraa", buffer, "binary");

  try {
    const stdout = execSync("./test.rraa", { stdio: "pipe" }).toString();

    if (stdout.trim() === "A") {
      process.exit(0);
    }
  } catch (err) {}

  arr.push(`0${next}`);
  arr.push(`${next}0`);
  arr.push(`1${next}`);
  arr.push(`${next}1`);
}
