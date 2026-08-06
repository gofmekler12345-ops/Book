import * as service from "../service/book.service.js"

export const addBook = async (req, res, next) => {
    try {
        await service.addBook(req.body);
        return res.sendStatus(201);
    } catch (e) {
        return next(e)
    }
}

export const findBookById = async (req, res, next) => {
    try {
        const book = await service.findBookById(req.params.isbn)
        if (book) {
            return res.status(200).json(book)
        }
    } catch (e) {
        return next(e)
    }
}

export const removeBook = async (req, res, next) => {
    try {
        const book = await service.removeBook(req.params.isbn)
        if (book) {
            return res.status(200).json(book)
        }
    } catch (e) {
        return next(e)
    }
}

export const updateBookTitle = async (req, res, next) => {
    try {
        const book = await service.updateBookTitle(req.params.isbn, req.params.title)
        if (book) {
            return res.status(201).json(book)
        }
    } catch (e) {
        return next(e)
    }
}

export const findBooksByAuthor = async (req, res, next) => {
    try {
        const books = await service.findBooksByAuthor(req.params.author)
        if (books) {
            return res.status(200).json(books)
        }
    } catch (e) {
        return next(e)
    }
}

export const findBooksByPublisher = async (req, res, next) => {
    try {
        const books = await service.findBooksByPublisher(req.params.publisher)
        if (books) {
            return res.status(200).json(books)
        }
    } catch (e) {
        return next(e)
    }
}

export const findBookAuthors = async (req, res, next) => {
    try {
        const authors = await service.findBookAuthors(req.params.isbn)
        if (authors) {
            return res.status(200).json(authors)
        }
    } catch (e) {
        return next(e)
    }
}

export const findBookPublishersByAuthor = async (req, res, next) => {
    try {
        const publishers = await service.findBookPublishersByAuthor(req.params.author)
        if (publishers) {
            return res.status(200).json(publishers)
        }
    } catch (e) {
        return next(e)
    }
}

export const removeAuthor = async (req, res, next) => {
    try {
        const author = await service.removeAuthor(req.params.author)
        if (author) {
            return res.status(200).json(author)
        }
    } catch (e) {
        return next(e)
    }
}