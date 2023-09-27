const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// #swagger.tags = ['Contacts']
// #swagger.description = 'Endpoint to get all contacts'
/*
    #swagger.responses[200] = {
        description: 'List of contacts',
        schema: { 
            $ref: "#/definitions/Contacts" 
        }
    }
*/

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

/*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Create a new contact'
    #swagger.parameters['newContact'] = {
        in: 'body',
        description: 'Information for the new contact',
        required: true,
        schema: { "$ref": "#/definitions/Contact" }
    }
*/

router.post('/', contactsController.createContact);

/*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Update an existing contact'
    #swagger.parameters['updatedContact'] = {
        in: 'body',
        description: 'Information for the updated contact',
        required: true,
        schema: { "$ref": "#/definitions/Contact" }
    }
*/

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;