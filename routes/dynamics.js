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

router.post("/", async (req, res) => {
    try {
        const dynamic = await Dynamic.create(req.body);
        res.status(200).json(dynamic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;