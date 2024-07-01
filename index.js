const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const MONGODB_URI = 'mongodb+srv://mel:wwww@cluster0.y8odhrm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    pages: Number,
    read: Boolean
});

const Book = mongoose.model('Book', bookSchema);

// Routes
app.get('/api/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

app.post('/api/books', async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json(newBook);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
