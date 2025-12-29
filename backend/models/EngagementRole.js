class EngagementRole {
  constructor({
    id,
    personId,
    type,
    source,
    instituteId,
    startDate,
    endDate,
    outcome,
    createdAt
  }) {
    this.id = id;
    this.personId = personId;
    this.type = type;
    this.source = source;
    this.instituteId = instituteId;
    this.startDate = startDate;
    this.endDate = endDate || null;
    this.outcome = outcome || null;
    this.createdAt = createdAt || new Date().toISOString();
  }
}

module.exports = EngagementRole;