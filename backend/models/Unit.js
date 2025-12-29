class Unit {
  constructor({ id, name, parentUnitId = null }) {
    this.id = id;
    this.name = name;
    this.parentUnitId = parentUnitId;
  }
}

module.exports = Unit;
