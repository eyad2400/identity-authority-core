const { v4: uuidv4 } = require('uuid');
const StaffRole = require('../models/StaffRole');
const config = require('../config/iac.config');
const {
  readCollection,
  writeCollection,
  appendAudit,
  assertRoleNotEnded,
  assertNoActiveStaffOverlap,
  endEngagementsOnStaffHire
} = require('./lifecycle.service');

async function listStaffRoles({ gaId, status } = {}) {
  const roles = await readCollection('staffRoles');
  return roles.filter(
    (role) => (!gaId || role.gaId === gaId) && (!status || role.status === status)
  );
}

async function createStaffRole({
  personId,
  staffType,
  gaId,
  unitId,
  rank,
  startDate,
  auditActor
}) {
  if (!config.staffTypes.includes(staffType)) {
    const e = new Error('Invalid staff type');
    e.status = 400;
    throw e;
  }

  const roles = await readCollection('staffRoles');
  assertNoActiveStaffOverlap(roles, personId, gaId);

  const role = new StaffRole({
    id: uuidv4(),
    personId,
    staffType,
    gaId,
    unitId,
    rank,
    status: 'active',
    startDate
  });

  roles.push(role);
  await writeCollection('staffRoles', roles);

  await endEngagementsOnStaffHire(personId, auditActor);
  await appendAudit('STAFF_ROLE_CREATED', {
    roleId: role.id,
    personId,
    gaId,
    actor: auditActor
  });

  return role;
}

async function endStaffRole({ roleId, personId, gaId, endDate, auditActor }) {
  const roles = await readCollection('staffRoles');
  const role = roles.find((item) => item.id === roleId && item.personId === personId);

  if (!role) {
    const e = new Error('StaffRole not found');
    e.status = 404;
    throw e;
  }

  if (role.gaId !== gaId) {
    const e = new Error('GA mismatch');
    e.status = 409;
    throw e;
  }

  assertRoleNotEnded(role);

  role.status = 'ended';
  role.endDate = endDate || new Date().toISOString();

  await writeCollection('staffRoles', roles);
  await appendAudit('STAFF_ROLE_ENDED', {
    roleId,
    personId,
    gaId,
    actor: auditActor
  });

  return role;
}

module.exports = {
  listStaffRoles,
  createStaffRole,
  endStaffRole
};