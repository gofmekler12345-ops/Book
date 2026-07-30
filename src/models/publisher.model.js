import {sequelize} from "../configurethion/database.js";
import {DataTypes} from "sequelize";

export const Publisher = sequelize.define('Publisher',{
    publisher_name: {type: DataTypes.STRING, allowNull: false, primaryKey: true, validate: {notEmpty: true}},
}, {tableName: 'publishers'})

export default Publisher;