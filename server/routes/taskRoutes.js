const express = require('express');
const router = express.Router();
const {
    getTasks,
} = require('../models/taskModel');

router.get('/', async (req, res) => {
    const tasks = await getTasks();
    res.json(tasks);
});

module.exports = router;
