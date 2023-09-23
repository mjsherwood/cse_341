const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { asyncHandler } = require('../middlewares/errorHandler');

const getAll = asyncHandler(async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
});

const getSingle = asyncHandler(async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        throw new Error('Invalid ObjectId format');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
    const lists = await result.toArray();
    if (lists.length === 0) {
        throw new Error('Contact not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
});

const createContact = async (req, res, next) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body.contact;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await mongodb.getDb().db().collection('contacts').insertOne({
      contact: {
        firstName, 
        lastName, 
        email, 
        favoriteColor, 
        birthday
      }
    });

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error('Error creating contact:', error);
    next(error); 
  }
};

const updateContact = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send('Invalid ObjectId format');
    }
    
    const contactId = new ObjectId(req.params.id);

    const updatedContact = {
      contact: req.body.contact
    };

    const result = await mongodb.getDb().db().collection('contacts').updateOne({ _id: contactId }, { $set: updatedContact });

    if (result.matchedCount === 0) {
      return res.status(404).send('Contact not found');
    }

    res.status(204).end();
  } catch (error) {
    console.error(`Error updating contact with id ${req.params.id}:`, error);
    next(new Error('Server error while updating the contact'));
  }
};

const deleteContact = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send('Invalid ObjectId format');
    }

    const contactId = new ObjectId(req.params.id);

    const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).send('Contact not found');
    }

    // Respond with 200 OK to signify successful deletion with a message
    res.status(200).send('Contact deleted successfully');

  } catch (error) {
    console.error(`Error deleting contact with id ${req.params.id}:`, error);
    next(new Error('Server error while deleting the contact'));
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
