const { v4: uuidv4 } = require('uuid');
const Person = require('../models/Person');
const { readCollection, writeCollection, appendAudit } = require('./lifecycle.service');

async function createPerson({ nationalId, fullName, dateOfBirth, auditActor }) {
  const persons = await readCollection('persons');
  const existing = persons.find((person) => person.nationalId === nationalId);
  if (existing) {
    return existing;
  }
  const person = new Person({
    id: uuidv4(),
    nationalId,
    fullName,
    dateOfBirth,
    createdAt: new Date().toISOString()
  });
  persons.push(person);
  await writeCollection('persons', persons);
  await appendAudit('PERSON_CREATED', { personId: person.id, actor: auditActor });
  return person;
}

async function getPerson(id) {
  const persons = await readCollection('persons');
  return persons.find((person) => person.id === id);
}

module.exports = {
  createPerson,
  getPerson
};