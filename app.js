const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Используем bodyParser для обработки данных в формате JSON
app.use(bodyParser.json());

// Пример "базы данных", я сделала массив
let data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
];

// Маршрут для получения всех элементов
app.get('/api/items', (req, res) => {
    res.json(data);
});

// Маршрут для получения элемента по ID
app.get('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = data.find(item => item.id === itemId);

    if (!item) {
        res.status(404).json({ error: 'Item not found' });
        return;
    }

    res.json(item);
});

// Маршрут для создания нового элементатоесть http
app.post('/api/items', (req, res) => {
    const newItem = req.body;
    newItem.id = data.length + 1;
    data.push(newItem);

    res.status(201).json(newItem);
});

// Маршрут для обновления элемента по ID
app.put('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;

    // Найти индекс элемента в массиве
    const index = data.findIndex(item => item.id === itemId);

    if (index === -1) {
        res.status(404).json({ error: 'Item not found' });
        return;
    }

    // Обновить элемент
    data[index] = { ...data[index], ...updatedItem };

    res.json(data[index]);
});

// Маршрут для удаления элемента по ID
app.delete('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);

    // Отфильтровать массив, оставив только те элементы, которые не соответствуют заданному ID
    data = data.filter(item => item.id !== itemId);

    res.json({ success: true });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
