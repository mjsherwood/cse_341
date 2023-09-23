const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    console.error("Error fetching all contacts:", error);
    res.status(500).send('Server error while fetching all contacts');
  }
};

const getSingle = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send('Invalid ObjectId format');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
    const lists = await result.toArray();
    if (lists.length === 0) {
      return res.status(404).send('Contact not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (error) {
    console.error(`Error fetching contact with id ${req.params.id}:`, error);
    res.status(500).send('Server error while fetching a contact');
  }
};

module.exports = { getAll, getSingle };
