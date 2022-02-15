const express = require('express');
const router = express.Router();

// Implement GET / READ - ALL
router.get('/', (req, res) => { // -> /pokemoncards/
    res.send('GET not implemented');
});

// Implement GET / READ - One Pokemoncard
router.get('/:id', (req, res) => {
    res.send('GET ' + req.params.id + ' not implemented yet')
});

router.post('/', (req, res) => {
    res.send('POST not yet implemented');
});

// Put updates
router.put('/:id', (req, res) => {
    res.send('PUT (' + req.params.id + ') not yet implemented')
});

// Delete deletes
router.delete('/:id', (req, res) => {
    res.send('DELETE (' + req.params.id + ') Not yet implemented')
});


module.exports = router;