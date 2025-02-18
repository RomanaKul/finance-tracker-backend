const express = require("express");
const router = express.Router();
const Dynamic = require("../models/dynamic.model");

router.get("/", async (req, res) => {
  try {
    const dynamics = await Dynamic.find({});
    res.status(200).json(dynamics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:indicatorId", async (req, res) => {
  try {
    const dynamics = await Dynamic.find({
      indicator: req.params.indicatorId,
    }).sort({ date: -1 });
    res.status(200).json(dynamics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const dynamic = await Dynamic.create(req.body);
    res.status(200).json(dynamic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const dynamic = await Dynamic.findByIdAndDelete(req.params.id);
    if (!dynamic) {
      return res.status(404).json({ message: "Dynamic not found" });
    }
    res.status(200).json(dynamic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/indicator/:indicatorId", async (req, res) => {
  try {
    const dynamics = await Dynamic.deleteMany({
      indicator: req.params.indicatorId,
    });
    res.status(200).json(dynamics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
