const express = require('express');
const router = express.Router();
const pokemonBattles_controller = require('../controllers/pokemonBattles_controller');
const log = require('debug')('route:pokemonBattles');

// Implement GET / READ -  All pokemoncards
// curl -X GET http://localhost:3000/pokemoncards/
router.get('/', pokemonBattles_controller.read);

// Implement GET / READ - One Pokemoncard
// curl -X GET http://localhost:3000/pokemoncards/1234
/*
router.get('/:id', (req, res) => {
    res.send('GET ' + req.params.id + ' not implemented yet')
});
*/
router.get('/:id', pokemonBattles_controller.read);

// Implement POST / CREATE - Create one pokemoncard
// curl -X POST http://localhost:3000/pokemoncards/ -H 'content-type: application/json' -d '{ "name" : "Bobba Fett", "hp" : 145 }'
router.post('/', pokemonBattles_controller.create);

// Implement PUT / UPDATE - Update one pokemoncard
// curl -X PUT http://localhost:3000/pokemoncards/1234
router.put('/:id', pokemonBattles_controller.update);

// Implement DELETE / DELETE (DESTROY) - Delete one pokemoncard
// curl -X DELETE http://localhost:3000/pokemoncards/1234
router.delete('/:id', pokemonBattles_controller.destroy);


module.exports = router;