const db = require('../models/taskModel');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await db.getTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter tarefas', error });
    }
};