import {sequelize} from "../configurethion/database.js";
import {DataTypes} from "sequelize";

const Author = sequelize.define('Author', {
    name: {type: DataTypes.STRING, primaryKey: true, allowNull: false, validate: {notEmpty: true}},
    birth_date: {type: DataTypes.DATEONLY, allowNull: false, validate: {notEmpty: true}},
}, {tableName: 'authors'})

export default Author;