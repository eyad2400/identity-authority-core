const { v4: uuidv4 } = require('uuid');
const EngagementRole = require('../models/EngagementRole');
const config = require('../config/iac.config');
const { readCollection, writeCollection, appendAudit } = require('./lifecycle.service');

function assertTraineeSource({ type, source, instituteId }) {
  if (type === 'trainee') {
    if (source !== 'ga') {
      const e = new Error('Trainee must originate from GA');
      e.status = 400;
      throw e;
    }
    if (instituteId !== config.gaIdentifiers.trainingInstituteId) {
      const e = new Error('Invalid GA training institute');
      e.status = 400;
      throw e;
    }
  }
}

async function createEngagementRole({
  personId,
  type,
  source,
  instituteId,
  startDate,
  auditActor
}) {
  if (!config.engagementTypes.includes(type)) {
    const e = new Error('Invalid engagement type');
    e.status = 400;
    throw e;
  }

  assertTraineeSource({ type, source, instituteId });

  const roles = await readCollection('engagements');
  const role = new EngagementRole({
    id: uuidv4(),
    personId,
    type,
    source,
    instituteId,
    startDate
  });

  roles.push(role);
  await writeCollection('engagements', roles);

  await appendAudit('ENGAGEMENT_ROLE_CREATED', {
    roleId: role.id,
    personId,
    type,
    actor: auditActor
  });

  return role;
}

async function listEngagements({ personId }) {
  const roles = await readCollection('engagements');
  return personId ? roles.filter((role) => role.personId === personId) : roles;
}

module.exports = {
  createEngagementRole,
  listEngagements
};