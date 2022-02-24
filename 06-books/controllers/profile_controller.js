/**
 * Profile Controller
 */

 const debug = require('debug')('books:profile_controller');
 const { matchedData, validationResult } = require('express-validator');
 const models = require('../models');
 
 /**
  * Get authenticated user's profile
  *
  * GET /
  */
 const getProfile = async (req, res) => {
	 // somehow get the authenticated user
	 // and return it
	console.log('Hello from the other side', req.user)

	 res.send({
		 status: 'success',
		 data: {
			 user: req.user,
		 }
	 });
 }
 
 /**
  * Update authenticated user's profile
  *
  * PUT /
  */
 const updateProfile = async (req, res) => {

	// check for any validation errors
	const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).send({ 
			status: 'fail', 
			data: errors.array() });
    }

	// Get only the validated data from the request
  const validData = matchedData(req);

	try {
		const updatedUser = await req.user.save(validData);
		debug("Updated user successfully: %O", updatedUser);

		res.send({
			status: 'success',
			data: {
				user: updatedUser,
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating a new user.',
		});
		throw error;
	}
}

 
 /**
  * Get authenticated user's books
  *
  * GET /books
  */
 const getBooks = async (req, res) => {
	// get user and also eagher-load the books-relation
	//  const user = await new models.User({ id: req.user.id}).fetch({ require: false, withRelated: ['books']
 	// });

	// "lazy load" the books-relation
	await req.user.load('books');

	 res.status(200).send({
		 status: 'Success',
		 data: {
			 books: req.user.related('books')
		 }
	 });
 }

//  const addBook = async (req, res) => {
// 	 const bookId = req.params.bookId;

// 	 //make sure book exists
// 	 const book = await new models.Book({ id: bookId }).fetch({ require: false });
// 	 if (!book) {
// 		 debug("Book to update was not found. %o", { id: bookId });
// 		 res.status(404).send({
// 			 status: 'fail',
// 			 data: 'Book Not Found',
// 		 });
// 		 return;
// 	 }

// 	 // check for any validation errors
// 	 const errors = validationResult(req);
// 	 if (!errors.isEmpty()) {
// 		return res.status(422).send({
// 			status: 'failed to find book',
// 			data: errors.array()
// 		});
// 	}

// 	// get only the validated data from the request
// 	 const validData = matchedData(req);

// 	 try {
// 		 const book = await new models.Book(validData).save();
// 		 debug('Created new book successfully: %0', book);

// 		 res.send({
// 			 status: 'success',
// 			 data: {
// 				 book,
// 			 }
// 		 });

// 	 } catch (error) {
// 		res.status(500).send({
// 			status: 'error',
// 			message: 'Exception thrown in database when creating a new book.',
// 		});
// 		throw error;
// 	 }
//  }


 
 module.exports = {
	 getProfile,
	 updateProfile,
	 getBooks,
	//  addBook,
 }
