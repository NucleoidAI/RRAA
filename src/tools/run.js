import { execSync } from "child_process";

try {
  const stdout = execSync("./test", {
    stdio: "pipe",
    input: "TEST",
  }).toString();

  if (stdout.trim() === "!") {
    console.log(stdout);
  }
} catch (err) {}
