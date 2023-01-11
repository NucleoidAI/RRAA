import fs from "fs";
import { execSync } from "child_process";
import moment from "moment";

const arr = ["0", "1"];
const map = new Map();

let index = 0;

while (arr.length) {
  const next = arr.shift();

  if (map.get(next)) {
    continue;
  } else {
    map.set(next, true);
  }

  const buffer = Buffer.alloc(Math.ceil(next.length / 8));

  for (let i = 0; i < next.length; i += 8) {
    const string = next.substring(i, i + 8);
    buffer[i / 8] = parseInt(string, 2);
  }

  fs.writeFileSync("test", buffer, { encoding: "binary", mode: 0o777 });

  try {
    const stdout = execSync("./test", { stdio: "pipe" }).toString();

    if (stdout.trim() === "!") {
      console.log(next);
      process.exit(0);
    }
  } catch (err) {}

  arr.push(`0${next}`);
  arr.push(`1${next}`);
  arr.push(`${next}0`);
  arr.push(`${next}1`);

  if (index > 1_000_000) {
    index = 0;
    fs.writeFileSync("log", `${moment().format()} ${arr.length} ${arr[0]}`);
  } else {
    index++;
  }
}
