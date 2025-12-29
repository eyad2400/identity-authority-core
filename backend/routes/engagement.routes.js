const router = require("express").Router();
const service = require("../services/engagement.service");

router.post("/", (req, res) => {
  try {
    res.json(service.createEngagement(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
