const express = require("express");
const router = express.Router();
const Indicator = require("../models/indicator.model");

router.get("/", async (req, res) => {
    try {
        const indicators = await Indicator.find({});
        res.status(200).json(indicators);
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

module.exports = router;