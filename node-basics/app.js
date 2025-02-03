const express = require("express");
const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log(`Запит: ${req.method} ${req.url}`);
    next();
});

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Привіт з Express.js!");
});

app.get("/user/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`Користувач з ID: ${userId}`);
});

app.post("/submit", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).send("Помилка: Вкажіть ім'я та електронну пошту!");
    }
    res.send(`Отримано дані: Ім'я - ${name}, Електронна пошта - ${email}`);
});

app.use((req, res) => {
    res.status(404).send("Сторінка не знайдена");
});

app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
});
