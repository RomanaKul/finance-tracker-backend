const express = require("express");
const router = express.Router();
const Enterprise = require("../models/enterprise.model");
const Indicator = require("../models/indicator.model");
const Dynamic = require("../models/dynamic.model");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const enterprises = await Enterprise.find({ userId: userId });
    res.status(200).json(enterprises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get enterprise by id
router.get("/:id", async (req, res) => {
  try {
    const enterprise = await Enterprise.findById(req.params.id);
    if (!enterprise) {
      return res.status(404).json({ message: "Enterprise not found" });
    }
    res.status(200).json(enterprise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get indicators
router.get("/:id/indicators", async (req, res) => {
  try {
    const indicators = await Indicator.find({ enterpriseId: req.params.id });
    res.status(200).json(indicators);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get dynamics
router.get("/:id/dynamics", async (req, res) => {
  try {
    const indicators = await Indicator.find({ _id: req.params.id });
    const indicatorIds = indicators.map((ind) => ind._id);
    const dynamics = await Dynamic.find({ indicator: { $in: indicatorIds } });
    res.status(200).json(dynamics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const enterpriseData = { ...req.body, userId };
    const enterprise = await Enterprise.create(enterpriseData);
    res.status(200).json(enterprise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const indicators = await Indicator.find({ enterpriseId: id });

    if (indicators.length > 0) {
      const indicatorIds = indicators.map((ind) => ind._id);
      await Dynamic.deleteMany({ indicator: { $in: indicatorIds } });
      await Indicator.deleteMany({ enterpriseId: id });
    }

    const enterprise = await Enterprise.findByIdAndDelete(id);
    if (!enterprise) {
      return res.status(404).json({ message: "Enterprise not found" });
    }
    res
      .status(200)
      .json({ message: "Enterprise and related data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const enterprise = await Enterprise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!enterprise) {
      return res.status(404).json({ message: "Enterprise not found" });
    }
    res.status(200).json(enterprise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
