const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Configurações
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../frontend/public')); // Servir arquivos frontend

// Conexão com SQLite
const db = new sqlite3.Database('./db/database.sqlite', (err) => {
    if (err) console.error(err.message);
    else console.log('Conectado ao SQLite!');
});

// Criar tabelas
db.serialize(() => {
    // Slots de horário
    db.run(`CREATE TABLE IF NOT EXISTS slots (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data DATE NOT NULL,
        inicio TIME NOT NULL,
        fim TIME NOT NULL,
        grupo TEXT
    )`);

    // Posts do fórum
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        grupo TEXT NOT NULL,
        pergunta TEXT NOT NULL,
        resposta TEXT,
        data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    // Acesso do professor (senha: "admin123")
    db.run(`CREATE TABLE IF NOT EXISTS admin (
        id INTEGER PRIMARY KEY,
        senha TEXT NOT NULL
    )`);
    
    // Inserir senha padrão (apenas uma vez)
    db.run(`INSERT INTO admin (senha) VALUES ('admin123')`);
});

// Rotas
const slotsRouter = require('./routes/slots');
const forumRouter = require('./routes/forum');
app.use('/api/slots', slotsRouter);
app.use('/api/forum', forumRouter);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
