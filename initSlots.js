const db = require('./db/database');

const slotsSexta = [
    { inicio: '13:40', fim: '14:20' },
    { inicio: '14:20', fim: '15:00' },
    { inicio: '15:40', fim: '16:20' },
    { inicio: '16:20', fim: '17:00' }
];

db.serialize(() => {
    slotsSexta.forEach((slot) => {
        db.run(
            'INSERT INTO slots (data, inicio, fim) VALUES (DATE("now"), ?, ?)',
            [slot.inicio, slot.fim]
        );
    });
    console.log('Slots criados com sucesso!');
});

db.close();
