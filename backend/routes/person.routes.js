const express = require('express');
const config = require('../config/iac.config');
const personService = require('../services/person.service');

const router = express.Router();

function system(req) {
  return req.header('x-system');
}

router.post('/', async (req, res, next) => {
  try {
    const actor = system(req);
    if (!config.allowedSystems.person.includes(actor)) {
      return res.status(403).json({ message: 'Unauthorized system' });
    }

    const { nationalId, fullName, dateOfBirth } = req.body;
    if (!nationalId || !fullName || !dateOfBirth) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    res.status(201).json(
      await personService.createPerson({
        nationalId,
        fullName,
        dateOfBirth,
        auditActor: actor
      })
    );
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const person = await personService.getPerson(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(person);
  } catch (error) {
    next(error);
  }
});

module.exports = router;