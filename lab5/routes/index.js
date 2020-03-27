var express = require('express');
var router = express.Router();
var About = require("./about");
var Story = require("./story");
var Education = require("./education");


router.get("/about", async (req, res) => {
    try {
        let about = await About;
        res.json(about);
    }
    catch (error) {
        res.status(404).json({ error: error });
    }
});

router.get("/story", async (req, res) => {
    try {
        let story = await Story;
        res.json(story);
    }
    catch (error) {
        res.status(404).json({ error: error });
    }
});

router.get("/education", async (req, res) => {
    try {
        let schools = await Education;
        res.json(schools);
    }
    catch (error) {
        res.status(404).json({ error: error });
    }
});

module.exports = router