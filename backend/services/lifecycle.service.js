const fs = require('fs/promises');
const path = require('path');

const collectionPaths = {
  persons: path.join(__dirname, '..', 'data', 'persons.json'),
  staffRoles: path.join(__dirname, '..', 'data', 'staffRoles.json'),
  engagements: path.join(__dirname, '..', 'data', 'engagements.json'),
  units: path.join(__dirname, '..', 'data', 'units.json')
};

async function ensureFile(filePath) {
  try {
    await fs.access(filePath);
  } catch (error) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, '[]');
  }
}

async function readCollection(name) {
  const filePath = collectionPaths[name];
  await ensureFile(filePath);
  const data = await fs.readFile(filePath, 'utf8');
  if (!data.trim()) {
    return [];
  }
  return JSON.parse(data);
}

async function writeCollection(name, items) {
  const filePath = collectionPaths[name];
  await ensureFile(filePath);
  await fs.writeFile(filePath, JSON.stringify(items, null, 2));
}

async function appendAudit(action, payload) {
  const line = JSON.stringify({
    timestamp: new Date().toISOString(),
    action,
    payload
  });
  const logPath = path.join(__dirname, '..', 'audit', 'transitions.log');
  await fs.mkdir(path.dirname(logPath), { recursive: true });
  await fs.appendFile(logPath, `${line}\n`);
}

function assertRoleNotEnded(role) {
  if (role.endDate || role.status === 'ended') {
    const error = new Error('Ended roles cannot be reactivated or modified.');
    error.status = 409;
    throw error;
  }
}

function assertNoActiveStaffOverlap(roles, personId, gaId) {
  const hasActive = roles.some(
    (role) => role.personId === personId && role.gaId === gaId && role.status === 'active'
  );
  if (hasActive) {
    const error = new Error('Active staff role already exists for this person in this GA.');
    error.status = 409;
    throw error;
  }
}

async function endEngagementsOnStaffHire(personId, auditActor) {
  const engagements = await readCollection('engagements');
  const now = new Date().toISOString();
  let updated = false;
  engagements.forEach((role) => {
    if (role.personId === personId && !role.endDate) {
      role.endDate = now;
      role.outcome = role.outcome || 'converted-to-staff';
      updated = true;
    }
  });
  if (updated) {
    await writeCollection('engagements', engagements);
    await appendAudit('ENGAGEMENT_ROLE_ENDED', {
      personId,
      actor: auditActor,
      reason: 'staff-created'
    });
  }
}

module.exports = {
  readCollection,
  writeCollection,
  appendAudit,
  assertRoleNotEnded,
  assertNoActiveStaffOverlap,
  endEngagementsOnStaffHire
};