const express = require('express');
const staffService = require('../services/staff.service');
const personService = require('../services/person.service');
const { assertHrms } = require('../integrations/hrms.client');

const router = express.Router();

function system(req) {
  return req.header('x-system');
}

router.get('/', async (req, res, next) => {
  try {
    res.json(await staffService.listStaffRoles(req.query));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const actor = system(req);
    assertHrms(actor);

    const { personId, staffType, gaId, unitId, rank, startDate } = req.body;
    if (!personId || !staffType || !gaId || !unitId || !startDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const person = await personService.getPerson(personId);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.status(201).json(
      await staffService.createStaffRole({
        personId,
        staffType,
        gaId,
        unitId,
        rank,
        startDate,
        auditActor: actor
      })
    );
  } catch (error) {
    next(error);
  }
});

router.post('/:id/end', async (req, res, next) => {
  try {
    const actor = system(req);
    assertHrms(actor);

    const { personId, gaId, endDate } = req.body;
    if (!personId || !gaId) {
      return res.status(400).json({ message: 'personId and gaId required' });
    }

    res.json(
      await staffService.endStaffRole({
        roleId: req.params.id,
        personId,
        gaId,
        endDate,
        auditActor: actor
      })
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;