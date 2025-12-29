const router = require("express").Router();
const service = require("../services/person.service");

router.post("/", (req, res) => {
  try {
    res.json(service.createPerson(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/:id", (req, res) => {
  const person = service.getPerson(req.params.id);
  if (!person) return res.status(404).end();
  res.json(person);
});

module.exports = router;
