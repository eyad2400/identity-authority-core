class StaffRole {
  constructor({
    id,
    personId,
    staffType,
    gaId,
    unitId,
    rank,
    status,
    startDate,
    endDate,
    createdAt
  }) {
    this.id = id;
    this.personId = personId;
    this.staffType = staffType;
    this.gaId = gaId;
    this.unitId = unitId;
    this.rank = rank;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate || null;
    this.createdAt = createdAt || new Date().toISOString();
  }
}

module.exports = StaffRole;