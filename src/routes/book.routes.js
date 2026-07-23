import {Router} from "express";
import * as controller from "../controller/book.controller.js";

const router = Router();

router.post('/book', controller.addBook);
router.get('/book/:isbn', controller.findBookById);
router.delete('/book/:isbn', controller.removeBook);
router.patch('/book/:isbn/title/:title', controller.updateBookTitle);
router.get('/books/author/:author', controller.findBooksByAuthor);
router.get('/books/publisher/:publisher', controller.findBooksByPublisher);
router.get('/authors/book/:isbn', controller.findBookAuthors);
router.get('/publishers/:author/:author', controller.findBookPublishersByAuthor);
router.delete('/author/:author', controller.removeAuthor);
export default router;