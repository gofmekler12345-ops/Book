import {Publisher} from "../models/index.js";

export const findPublisherById = async (id, options={}) => Publisher.findByPk(id,options)

export const addPublisher = async (publisherName) => Publisher.create({publisher_name: publisherName})