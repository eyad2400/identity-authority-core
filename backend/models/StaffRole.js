class StaffRole {
  constructor({
    id,
    personId,
    staffType,
    gaId,
    unitId,
    rank,
    startDate
  }) {
    this.id = id;
    this.personId = personId;
    this.staffType = staffType;
    this.gaId = gaId;
    this.unitId = unitId;
    this.rank = rank;
    this.startDate = startDate;
    this.endDate = null;
    this.status = "active";
  }
}

module.exports = StaffRole;
