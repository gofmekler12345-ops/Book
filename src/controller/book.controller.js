import * as service from "../service/book.service.js"

export const addBook =async (req, res)=> {
 const book=await service.addBook(req.body)
    if(book){
        return res.status(200).message(true);
    }
}

export const findBookById = async (req, res) => {
    const book = await service.findBookById(req.params.isbn)
    if (book) {
        return res.status(200).json(book)
    }
}

export const removeBook = async (req, res) => {
    const book = await service.removeBook(req.params.isbn)
    if (book) {
        return res.status(200).message(book)
    }
}

export const updateBookTitle = async (req, res) => {
    const book = await service.updateBookTitle(req.body.title)
    if (book) {
        return res.status(200).message(book)
    }
}

export const findBooksByAuthor = async (req, res) => {
    const books = await service.findBooksByAuthor(req.params.author)
    if (books) {
        return res.status(200).json(books)
    }
}

export const findBooksByPublisher = async (req, res) => {
    const books = await service.findBooksByPublisher(req.params.publisher)
    if (books) {
        return res.status(200).json(books)
    }
}

export const findBookAuthors = async (req, res) => {
    const authors = await service.findBookAuthors(req.params.isbn)
    if (authors) {
        return res.status(200).json(authors)
    }
}

export const findBookPublishersByAuthor = async (req, res) => {
    const publishers = await service.findBookPublishersByAuthor(req.params.author)
    if (publishers) {
        return res.status(200).json(publishers)
    }
}

export const removeAuthor = async (req, res) => {
    const author = await service.removeAuthor(req.params.author)
    if (author) {
        return res.status(200).message(author)
    }
}