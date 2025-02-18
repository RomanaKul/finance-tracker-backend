const express = require("express");
const router = express.Router();
const Indicator = require("../models/indicator.model");
const Dynamic = require("../models/dynamic.model");

router.get("/enterprise/:enterpriseId", async (req, res) => {
  try {
    const indicators = await Indicator.find({
      enterpriseId: req.params.enterpriseId,
    });
    res.status(200).json(indicators);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const indicator = await Indicator.findById(req.params.id);
    res.json(indicator);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const indicator = await Indicator.create(req.body);
    res.status(200).json(indicator);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Dynamic.deleteMany({ indicator: id });
    const indicator = await Indicator.findByIdAndDelete(id);
    if (!indicator) {
      return res.status(404).json({ message: "Indicator not found" });
    }
    res
      .status(200)
      .json({ message: "Indicator and related dynamics deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const indicator = await Indicator.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!indicator) {
      return res.status(404).json({ message: "Indicator not found" });
    }
    res.status(200).json(indicator);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
