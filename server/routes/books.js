const express = require("express");
const multer = require("multer");
const Book = require("../models/Book");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Get all books
router.get("/", async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// Add a new book
router.post("/", upload.single("coverImage"), async (req, res) => {
    const { title, author, read } = req.body;
    const coverImage = req.file ? req.file.path : null;
    const newBook = new Book({ title, author, coverImage, read });
    await newBook.save();
    res.json(newBook);
});

module.exports = router;
