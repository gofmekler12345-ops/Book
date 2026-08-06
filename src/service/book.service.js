import * as bookRepository from "../repository/book.repository.js"
import * as publisherRepository from "../repository/publisher.repository.js"
import * as authorRepository from "../repository/author.repository.js"
import {Author} from "../models/index.js";
import {sequelize} from "../configurethion/database.js";

export const addBook = async (book) => {
    const t = await sequelize.transaction();
    try {
        const {isbn, title} = book;
        if (await bookRepository.findBookId(isbn)) {
            throw new Error('Book already exists')
        }
        let publisher = await publisherRepository.findPublisherById(book.publisher)
        if (!publisher) {
            await publisherRepository.addPublisher(book.publisher)
        }
        const authors = [];
        for (const a of book.authors) {
            let author = await authorRepository.findAuthorById(a.name)
            if (!author) {
                author = await authorRepository.addAuthor(a)
            }
            authors.push(author);
        }
        book = await bookRepository.addBook({isbn, title, publisher: book.publisher});
        await book.setAuthors(authors)
        await t.commit();
    } catch (e) {
        await t.rollback();
        console.log('Error adding book:', e);
        throw e;
    }
}

export const findBookById = async (isbn) => {
    const book = await bookRepository.findBookId(isbn, {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [{
            model: Author,
            as: 'authors',
            through: {attributes: []},
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'birth_date'],
                include: ['name', [sequelize.col('birth_date'), 'birthDate']]
            }
        }]
    })
    if (!book) {
        throw new Error('Book not found')
    }
    return book;
}

export const removeBook = async (isbn) => {
    const transaction = await sequelize.transaction();
    try {
        const book = await bookRepository.findBookId(isbn, {transaction});
        if (!book) {
            throw new Error('Book not found')
        }
        await book.destroy({transaction});
        await transaction.commit();
        return book;
    } catch (e) {
        await transaction.rollback();
        console.log('Error adding book:', e);
        throw e;
    }
}

export const updateBookTitle = async (isbn, title) => {
    const transaction = await sequelize.transaction();
    try {
        const book = await bookRepository.updateBookTitle(isbn, title, {
            transaction,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: Author,
                as: 'authors',
                through: {attributes: []},
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'birth_date'],
                    include: ['name', [sequelize.col('birth_date'), 'birthDate']]
                }
            }]
        });
        if (!book) {
            throw new Error('Book not found')
        }
        await transaction.commit();
        return book;
    } catch (e) {
        await transaction.rollback();
        console.log('Error update title:', e);
        throw e;
    }
}

export const findBooksByAuthor = async (authorName) => {
    console.log(authorName)
    const author = await authorRepository.findAuthorById(authorName);
    if (!author) {
        throw new Error(`Author with name ${authorName} not found`);
    }
    return await author.getBooks({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        joinTableAttributes: [],
        include: [
            {
                model: Author,
                as: 'authors',
                through: {
                    attributes: []
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'birth_date'],
                    include: ['name', [sequelize.col('birth_date'), 'birthDate']]
                }
            }
        ]
    });
}

export const findBooksByPublisher = async (publisher) => {
    const transaction = await sequelize.transaction();
    try {
        const book = await bookRepository.findBooksByPublisher(publisher, {
            transaction,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: Author,
                as: 'authors',
                through: {attributes: []},
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'birth_date'],
                    include: ['name', [sequelize.col('birth_date'), 'birthDate']]
                }
            }]
        });
        if (!book) {
            throw new Error('Book not found')
        }
        await transaction.commit();
        return book;
    } catch (e) {
        await transaction.rollback();
        console.log('Book not found:', e);
        throw e;
    }
}

export const findBookAuthors = async (isbn) => {
    const book = await findBookById(isbn);
    if (!book) {
        throw new Error('Book not found')
    }
    return await book.getAuthors({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'birth_date'],
            include: ['name', [sequelize.col('birth_date'), 'birthDate']]
        },
        joinTableAttributes: []

    });
}

export const findBookPublishersByAuthor = async (authorName) => {
        const author = await authorRepository.findAuthorById(authorName);
        if (!author) {
            throw new Error(`Author with name ${authorName} not found`);
        }
        const publishers = await bookRepository.booksSummary('publisher', 'DISTINCT', {
            include: {
                model: Author,
                as: 'authors',
                where: {
                    name: authorName
                },
                through: {
                    attributes: []
                }
            },
            plain: false
        })
        return publishers.map(publisher => publisher.DISTINCT);
    }

export const removeAuthor = async (authorName) => {
    const transaction = await sequelize.transaction();
    try {
        const author = await authorRepository.findAuthorById(authorName, {
            transaction,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'birth_date'],
                include: ['name', [sequelize.col('birth_date'), 'birthDate']]
            }
        });
        if (!author) {
            throw new Error(`Author with name ${authorName} not found`);
        }
        const bookCount = await author.countBooks({transaction})
        if(bookCount){
            throw new Error(`Author with name ${authorName} have books`);
        }
        await author.destroy({transaction});
        await transaction.commit();
        return author;
    } catch (e) {
        await transaction.rollback();
        console.log('Error removing author:', e);
        throw e;
    }
}

