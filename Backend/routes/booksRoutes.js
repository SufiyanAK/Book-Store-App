import express from 'express';
import { Book } from '../models/bookModels.js';

const router = express.Router();


// Route to Post New Book in DB
router.post('/', async (req, res) => {
    try {
        const { title, auther, publishYear } = req.body;
        if (!title.trim() || !auther.trim() || !publishYear.trim()) {
            return res.status(400).send({
                message: 'Send all required Fields Title, Auther and Publish Year'
            })
        }

        const newBook = {
            title: title,
            auther: auther,
            publishYear: publishYear
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book)

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Route to Get all Books from DB
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});

        res.status(200).json({
            count: books.length,
            data: books
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to Get book from DB by ID
router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const book = await Book.findById(id);

        res.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to Update the Book in DB
router.put('/:id', async (req, res) => {
    try {
        const { title, auther, publishYear } = req.body;
        if (!title.trim() || !auther.trim() || !publishYear.trim()) {
            return res.status(400).send({
                message: 'Send all required Fields Title, Auther and Publish Year'
            });
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: "Book not Found" })
        }
        return res.status(200).send({ message: "Book updated sucessfully" })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to Delete the Book in DB
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Book not Found" })
        }
        return res.status(200).send({ message: "Book deleted sucessfully" })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router