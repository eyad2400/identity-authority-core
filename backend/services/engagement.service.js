const fs = require("fs");
const path = require("path");
const EngagementRole = require("../models/EngagementRole");
const { TRAINEE_SOURCE } = require("../config/iac.config");

const file = path.join(__dirname, "../data/engagements.json");

function read() {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function write(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function createEngagement(payload) {
  if (payload.type === "trainee" && payload.source !== TRAINEE_SOURCE) {
    throw new Error("Trainees can only originate from GA institute");
  }
  const engagements = read();
  const role = new EngagementRole(payload);
  engagements.push(role);
  write(engagements);
  return role;
}

module.exports = { createEngagement };
