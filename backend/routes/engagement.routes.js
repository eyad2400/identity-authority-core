const express = require('express');
const config = require('../config/iac.config');
const engagementService = require('../services/engagement.service');
const personService = require('../services/person.service');

const router = express.Router();

function system(req) {
  return req.header('x-system');
}

router.post('/', async (req, res, next) => {
  try {
    const actor = system(req);
    const { personId, type, source, instituteId, startDate } = req.body;

    if (!personId || !type || !source || !startDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (type === 'trainee' && !instituteId) {
      return res.status(400).json({ message: 'instituteId required for trainee' });
    }

    const allowed = config.allowedSystems.engagementRole[type];
    if (!allowed || !allowed.includes(actor)) {
      return res.status(403).json({ message: 'Unauthorized system' });
    }

    const person = await personService.getPerson(personId);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.status(201).json(
      await engagementService.createEngagementRole({
        personId,
        type,
        source,
        instituteId,
        startDate,
        auditActor: actor
      })
    );
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    res.json(await engagementService.listEngagements(req.query));
  } catch (error) {
    next(error);
  }
});

module.exports = router;