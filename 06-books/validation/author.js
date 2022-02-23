// User Validation Rules

const { body } = require('express-validator');

const createRules = [
    body('first_name').exists().isLength({ min: 2 }),
    body('last_name').exists().isLength({ min: 2 }),
    body('birthyear').exists().isLength({ min: 4, max: 4 })
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