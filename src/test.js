import fs from "fs";

const input = fs.readFileSync(0, "utf8").trim();

if (input.length === 0) {
  console.log("No input received");
} else {
  const [a, b] = input.split(/\s+/).map(Number);
  console.log(a + b);
}
