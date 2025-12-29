class Unit {
  constructor({ id, name, parentUnitId }) {
    this.id = id;
    this.name = name;
    this.parentUnitId = parentUnitId || null;
  }
}

module.exports = Unit;