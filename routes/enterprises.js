const express = require("express");
const router = express.Router();
const Enterprise = require("../models/enterprise.model");

router.get("/", async (req, res) => {
    try {
        const enterprises = await Enterprise.find({});
        res.status(200).json(enterprises);
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

module.exports = router;