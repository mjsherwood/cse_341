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

module.exports = { getAll, getSingle };
