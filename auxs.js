const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/api/games', async (req, res) => {
    try {
        const response = await fetch('https://www.freetogame.com/api/games?platform=pc');
        const data = await response.json();
        const limitedData = data.slice(0, 20);
        res.json(limitedData);
    } catch (error) {
        console.error('Error al obtener los juegos:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

app.post('/getpassword', (req, res) => {
    const { username } = req.body;

    fs.readFile('./data/users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }
        const users = JSON.parse(data);
        const user = users.find(u => u.username === username);

        if (user) {
            res.json({ password: user.password });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    });
});

module.exports = app;
