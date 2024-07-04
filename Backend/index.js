import express from 'express';
import mongoose from 'mongoose'
import { PORT, mongoDB } from './config.js'
import bookRoute from './routes/booksRoutes.js'
import cors from 'cors';

const app = express();

app.use(express.json());

// Middleware for parsing request body
app.get('/', (req, res) => {
    return res.status(234).send('Welcome Sufiyan')
});

// Middleware for handling CORS POLICY
// Option 1: Allow All Origin with Default of cors(*)
app.use(cors())
// Option 2: Allow Custom Origin
// app.use(
//     cors({
//         origin: 'gttp:localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.use('/books', bookRoute);

mongoose.connect(mongoDB)
    .then(() => {
        console.log("App Connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to Port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })