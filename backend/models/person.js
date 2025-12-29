class Person {
  constructor({ id, nationalId, fullName, dateOfBirth }) {
    this.id = id;
    this.nationalId = nationalId;
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Person;
