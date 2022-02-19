const express = require('express');
// Måste alltid skapa modulerna
const router = express.Router();
const log = require('../logging.js');


router.get('/', (req, res) => {
    log.info('In routes %s', req.url)
    res.send('OK!');
});

// Läs in sub-routes Använd /authors som endpoint, och hämta den från ./authors_route
router.use('/authors', require('./authors_route'));
router.use('/titles', require('./titles_route'));
router.use('/user', require('./user_route'));
router.use('/reservation', require('./reservation_route'));
//router.use('/pokemonbattles', require('./pokemonbattles_route'));

// Måste alltid exporta moduler
module.exports = router;