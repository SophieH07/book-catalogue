const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
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
    },
});

const upload = multer({ storage: storage });

// Get all books
router.get("/books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });

        if (!books) {
            return res.status(404).send("Books not found");
        }

        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Get read/unread books
router.get("/books/:read", async (req, res) => {
    try {
        const { read } = req.params;
        const books = await Book.find({ read: read });

        if (!books) {
            return res.status(404).send("Books not found");
        }

        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Get book by id
router.get("/book/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).send("Book not found");
        }

        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Post a new book
router.post("/", upload.single("coverImage"), async (req, res) => {
    try {
        const { title, author, read, createdAt, updatedAt } = req.body;
        const coverImage = req.file ? req.file.filename : null;
        const newBook = new Book({
            title,
            author,
            coverImage,
            read,
            createdAt,
            updatedAt,
        });
        await newBook.save();
        res.json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Update read status
router.patch("/book/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { read, updatedAt } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { read, updatedAt },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).send("Book not found");
        }

        res.json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Delete a book by id
router.delete("/book/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send("Book not found");
        }

        // Remove the cover image file if it exists
        if (book.coverImage) {
            const filePath = path.join(__dirname, "../uploads/", book.coverImage);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await book.deleteOne();
        res.json({ message: "Book deleted successfully", id });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
