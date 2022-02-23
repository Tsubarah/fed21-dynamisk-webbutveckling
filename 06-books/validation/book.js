// User Validation Rules

const { body } = require('express-validator');

const createRules = [
    body('title').exists().isLength({ min: 2 }),
    body('isbn').exists().isLength({ min: 2 }),
    body('pages').exists().isLength({ min: 1 })
];

const updateRules = [
    body('first_name').optional().isLength({ min: 3 }),
    body('last_name').optional().isLength({ min: 4 }),
    body('birthyear').optional().isLength({ min: 4, max: 4 })
];

module.exports = {
    createRules, 
    updateRules,
}