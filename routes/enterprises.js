const express = require("express");
const router = express.Router();
const Enterprise = require("../models/enterprise.model");
const Indicator = require("../models/indicator.model");
const Dynamic = require("../models/dynamic.model");

router.get("/", async (req, res) => {
  try {
    const enterprises = await Enterprise.find({});
    res.status(200).json(enterprises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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

router.post("/", async (req, res) => {
  try {
    const enterprise = await Enterprise.create(req.body);
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
      const indicatorIds = indicators.map(ind => ind._id);
      await Dynamic.deleteMany({ indicator: { $in: indicatorIds } });
      await Indicator.deleteMany({ enterpriseId: id });
    }

    const enterprise = await Enterprise.findByIdAndDelete(id);
    if (!enterprise) {
      return res.status(404).json({ message: "Enterprise not found" });
    }
    res.status(200).json({ message: "Enterprise and related data deleted successfully" });
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
