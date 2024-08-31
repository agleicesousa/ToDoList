require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});

app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});