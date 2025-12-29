const fs = require("fs");
const path = require("path");
const Person = require("../models/Person");

const file = path.join(__dirname, "../data/persons.json");

function read() {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function write(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function createPerson(payload) {
  const persons = read();
  if (persons.find(p => p.nationalId === payload.nationalId)) {
    throw new Error("Person already exists");
  }
  const person = new Person(payload);
  persons.push(person);
  write(persons);
  return person;
}

function getPerson(id) {
  return read().find(p => p.id === id);
}

module.exports = { createPerson, getPerson };
