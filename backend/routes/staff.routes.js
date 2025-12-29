const router = require("express").Router();
const service = require("../services/staff.service");

router.post("/", (req, res) => {
  try {
    res.json(service.createStaffRole(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post("/:id/end", (req, res) => {
  try {
    res.json(service.endStaffRole(req.params.id));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/", (req, res) => {
  res.json(service.getActiveByGA(req.query.gaId));
});

module.exports = router;
