class Person {
  constructor({ id, nationalId, fullName, dateOfBirth, createdAt }) {
    this.id = id;
    this.nationalId = nationalId;
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
    this.createdAt = createdAt || new Date().toISOString();
  }
}

module.exports = Person;