const fs = require('fs');

fs.readFile('./readme.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Помилка читання файлу:', err);
        return;
    }
    console.log('Вміст файлу:', data);
});

fs.writeFile('result.txt', 'Node home task', (err) => {
    if (err) {
        console.error('Помилка запису файлу:', err);
        return;
    }
    console.log('Файл успішно записано');
});

if (fs.existsSync('example.txt')) {
    console.log('Файл існує');
} else {
    console.log('Файл не знайдено');
}

fs.mkdir('newFolder', (err) => {
    if (err) {
        console.error('Помилка створення папки newFolder', err);
        return;
    }
    console.log('Папку newFolder створено');
})
