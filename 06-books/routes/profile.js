const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const profileValidationRules = require('../validation/profile');

/* Get authenticated user's profile */
router.get('/', profileController.getProfile);  // <-- /profile

/* Update authenticated user's profile */
// Add validationrules as a 1st param.
router.put('/', profileValidationRules.updateRules, profileController.updateProfile); // <-- /profile

/* Get authenticated user's books */ 
router.get('/books', profileController.getBooks); // <-- /profile/books



module.exports = router;
