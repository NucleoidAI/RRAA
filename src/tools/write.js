import fs from "fs";

const next = "100010001";

const buffer = Buffer.alloc(Math.ceil(next.length / 8));

for (let i = 0; i < next.length; i += 8) {
  const string = next.substring(i, i + 8);
  buffer[i / 8] = parseInt(string, 2);
}

fs.writeFileSync("./test", buffer, { encoding: "binary", mode: 0o777 });
