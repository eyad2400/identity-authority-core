const fs = require("fs");
const path = require("path");
const StaffRole = require("../models/StaffRole");

const file = path.join(__dirname, "../data/staffRoles.json");

function read() {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function write(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function createStaffRole(payload) {
  const roles = read();
  if (roles.find(r => r.personId === payload.personId && r.status === "active")) {
    throw new Error("Person already has active StaffRole");
  }
  const role = new StaffRole(payload);
  roles.push(role);
  write(roles);
  return role;
}

function endStaffRole(id) {
  const roles = read();
  const role = roles.find(r => r.id === id && r.status === "active");
  if (!role) throw new Error("Active StaffRole not found");
  role.status = "ended";
  role.endDate = new Date().toISOString();
  write(roles);
  return role;
}

function getActiveByGA(gaId) {
  return read().filter(r => r.gaId === gaId && r.status === "active");
}

module.exports = { createStaffRole, endStaffRole, getActiveByGA };
