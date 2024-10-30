const express = require("express");
const multer = require("multer");
const path = require("path");
const Book = require("../models/Book");

const router = express.Router();

// Save images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const newFileName = Date.now() + ext;
        cb(null, newFileName);
    }
});

const upload = multer({ storage: storage });

// Get all books
router.get("/", async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// Post a new book
router.post("/", upload.single("coverImage"), async (req, res) => {
    try {
        const { title, author, read } = req.body;
        const coverImage = req.file ? req.file.filename : null;
        const newBook = new Book({ title, author, coverImage, read });
        await newBook.save();
        res.json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
