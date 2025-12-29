const config = require('../config/iac.config');

function assertHrms(systemName) {
  if (!config.allowedSystems.staffRole.includes(systemName)) {
    const error = new Error('Only HRMS is allowed to perform this action.');
    error.status = 403;
    throw error;
  }
}

module.exports = {
  assertHrms
};