import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        auther: {
            type: String,
            require: true
        },
        publishYear: {
            type: Number,
            require: true
        },
    },
    {
        timeStamps: true,
    }
);

export const Book = mongoose.model('Book', bookSchema);