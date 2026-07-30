import {Book} from "../models/index.js";

export const addBook = async (book, options = {}) => await Book.create(book, options);

export const findBookId = async (id, options = {}) => await Book.findByPk(id, options)

export const updateBookTitle = async (id, title, options) => {
    const book = await Book.findByPk(id, options);
    if (!book) return null;
    book.title = title;
    return book.save(options);
}

export const findBooksByAuthor = async (author, options = {}) => {
    return await Book.findAll({where: {author: author}, ...options});
};

export const findBooksByPublisher = async (publisher, options = {}) => {
    return await Book.findAll({where: {publisher: publisher}, ...options});
}