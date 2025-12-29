class EngagementRole {
  constructor({
    id,
    personId,
    type,
    source,
    instituteId,
    startDate,
    endDate = null,
    outcome = null
  }) {
    this.id = id;
    this.personId = personId;
    this.type = type;
    this.source = source;
    this.instituteId = instituteId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.outcome = outcome;
  }
}

module.exports = EngagementRole;
