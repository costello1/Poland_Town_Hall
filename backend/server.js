const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const usersFile = 'users.json';
const answersFile = 'answers.json';

// Funzione per leggere i dati dal file JSON
const readData = (file) => {
    if (!fs.existsSync(file)) {
        return {};
    }
    const data = fs.readFileSync(file);
    return JSON.parse(data);
};

// Funzione per scrivere i dati nel file JSON
const writeData = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// Endpoint per controllare se un utente ha già risposto
app.get('/user/:id', (req, res) => {
    const users = readData(usersFile);
    const userId = req.params.id;
    const user = users[userId];

    if (user) {
        res.json({ hasSubmitted: user.hasSubmitted });
    } else {
        res.json({ hasSubmitted: false });
    }
});

// Endpoint per aggiornare lo stato di un utente
app.post('/user/:id', (req, res) => {
    const users = readData(usersFile);
    const userId = req.params.id;
    const { hasSubmitted } = req.body;

    users[userId] = { hasSubmitted };
    writeData(usersFile, users);

    res.json({ success: true });
});

// Endpoint per ottenere i risultati delle risposte
app.get('/answers', (req, res) => {
    const answers = readData(answersFile);
    res.json(answers);
});

app.post('/answers', (req, res) => {
    const answers = readData(answersFile);
    const { answer } = req.body;

    if (answer === 'RESET') {
        // Resetta tutte le risposte
        writeData(answersFile, {});
        res.json({ success: true });
    } else {
        if (!answers[answer]) {
            answers[answer] = 0;
        }
        answers[answer] += 1;

        writeData(answersFile, answers);
        res.json({ success: true });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
