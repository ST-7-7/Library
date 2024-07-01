const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const MONGODB_URI = process.env.MONGODB_URI;

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

app.get('/api/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

app.post('/api/books', async (req, res) => {
  try {
      const newBook = new Book(req.body);
      await newBook.save();
      console.log('Saved new book:', newBook); 
      res.json(newBook);
  } catch (err) {
      console.error('Error saving book:', err); 
      res.status(500).json({ error: 'Failed to save book' });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
