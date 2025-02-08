const express = require("express");
const router = express.Router();
const CurrencyRate = require("../models/currencyRate.model");

router.get("/", async (req, res) => {
    try {
        const rates = await CurrencyRate.find({});
        res.status(200).json(rates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const rate = await CurrencyRate.create(req.body);
        res.status(200).json(rate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;