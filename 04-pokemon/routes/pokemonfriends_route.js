const express = require('express');
const router = express.Router();
const pokemonfriends_controller = require('../controllers/pokemonfriends_controller');

// // Implement GET / READ - ALL
// router.get('/', (req, res) => { // -> /pokemoncards/
//     res.send('GET not implemented');
// });

// // Implement GET / READ - One Pokemoncard
// router.get('/:id', (req, res) => {
//     res.send('GET ' + req.params.id + ' not implemented yet')
// });

// router.post('/', (req, res) => {
//     res.send('POST not yet implemented');
// });

// // Put updates
// router.put('/:id', (req, res) => {
//     res.send('PUT (' + req.params.id + ') not yet implemented')
// });

// // Delete deletes
// router.delete('/:id', (req, res) => {
//     res.send('DELETE (' + req.params.id + ') Not yet implemented')
// });


// Implement GET / READ -  All pokemoncards
// curl -X GET http://localhost:3000/pokemoncards/
router.get('/', pokemonfriends_controller.read);

// Implement GET / READ - One Pokemoncard
// curl -X GET http://localhost:3000/pokemoncards/1234
/*
router.get('/:id', (req, res) => {
    res.send('GET ' + req.params.id + ' not implemented yet')
});
*/
router.get('/:id', pokemonfriends_controller.read);

// Implement POST / CREATE - Create one pokemoncard
// curl -X POST http://localhost:3000/pokemoncards/ -H 'content-type: application/json' -d '{ "name" : "Bobba Fett", "hp" : 145 }'
router.post('/', pokemonfriends_controller.create);

// Implement PUT / UPDATE - Update one pokemoncard
// curl -X PUT http://localhost:3000/pokemoncards/1234
router.put('/:id', pokemonfriends_controller.update);

// Implement DELETE / DELETE (DESTROY) - Delete one pokemoncard
// curl -X DELETE http://localhost:3000/pokemoncards/1234
router.delete('/:id', pokemonfriends_controller.destroy);


module.exports = router;