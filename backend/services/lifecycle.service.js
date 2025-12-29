const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "../audit/transitions.log");

function log(message) {
  fs.appendFileSync(logFile, `[${new Date().toISOString()}] ${message}\n`);
}

module.exports = { log };
