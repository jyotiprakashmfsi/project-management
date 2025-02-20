const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => console.log("Timer 1 expired"), 0);

fs.readFile("text-file.txt", () => {
  console.log("I/O finished");

  setTimeout(() => console.log("Timer 2 expired"), 0);
  setImmediate(() => console.log("setImmediate 1 finished"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted 1");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted 2");
  });
});

console.log("Top-level code");