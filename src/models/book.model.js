import {Schema, model} from "mongoose";

export const BookSchema = new Schema({
    isbn: {type: String, required: true},
    title: {type: String, required: true},
    authors:{
        type: [String],
        default: ['author']
    },
    publisher: {type: String, required: true},
},{
    versionKey: false
})

export default model('Book', BookSchema, 'book');