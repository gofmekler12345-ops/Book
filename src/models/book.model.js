import {sequelize} from "../configurethion/database.js";
import {DataTypes} from "sequelize";


export const Book = sequelize.define('Book',{
    isbn: {type: DataTypes.STRING, allowNull: false, primaryKey: true, validate: {notEmpty: true}},
    title: {type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true}},
}, {
    tableName: 'books',
})

export default Book;