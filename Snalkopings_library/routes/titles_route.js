const express = require('express');
const router = express.Router();
const titles_controller = require('../controllers/titles_controller');
const log = require('../logging.js');

// Implement GET / READ -  All pokemoncards
// curl -X GET http://localhost:3000/pokemoncards/
router.get('/', titles_controller.read);

// Implement GET / READ - One Pokemoncard
// curl -X GET http://localhost:3000/pokemoncards/1234
/*
router.get('/:id', (req, res) => {
    res.send('GET ' + req.params.id + ' not implemented yet')
});
*/
router.get('/:id', titles_controller.read);

// Implement POST / CREATE - Create one pokemoncard
// curl -X POST http://localhost:3000/pokemoncards/ -H 'content-type: application/json' -d '{ "name" : "Bobba Fett", "hp" : 145 }'
router.post('/', titles_controller.create);

// Implement PUT / UPDATE - Update one pokemoncard
// curl -X PUT http://localhost:3000/pokemoncards/1234
router.put('/:id', titles_controller.update);

// Implement DELETE / DELETE (DESTROY) - Delete one pokemoncard
// curl -X DELETE http://localhost:3000/pokemoncards/1234
router.delete('/:id', titles_controller.destroy);


module.exports = router;