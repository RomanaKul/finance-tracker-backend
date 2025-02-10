const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/register", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        if (user.password !== req.body.password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;