/**
 * User Validation Rules
 */

 const { body } = require('express-validator');

 
 /**
  * Update User validation rules
  *
  * Required: -
  * Optional: password, first_name, last_name
  */
 const updateRules = [
     body('password').optional().isLength({ min: 4 }),
     body('first_name').optional().isLength({ min: 2 }),
     body('last_name').optional().isLength({ min: 2 }),
 ];
 
 module.exports = {
     updateRules,
 }
 