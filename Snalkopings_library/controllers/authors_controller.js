const authors = require('../models/authors');
const log = require('../logging.js');

// Create - skapa ett kort i databasen
const create = async(req, res) => {
    try {
        
        let author = await new authors(req.body).save();

        return res.status(201).send({
            success: true,
            data: {
                author
            }
        });

    } catch (err) {
        
        return res.status(500).send({
            success: false,
            data: err.message
        });
    }
};

// Read - läs ett eller flera kort från databasen
const read = async(req, res) => {
    try {
        log.message('Reading author %s', message)
        let author;

        if (req.params.id) {
            author = await authors.where({ 'id' : req.params.id }).fetch( { require: false, withRelated: ['showTitles'] });
        } else {
            author = await authors.fetchAll({ withRelated: ['showTitles'] });
        }

        if(!author) {
            return res.status(400).send({ 
                success: false,
                data: 'Not found'
            });
        }
        

        return res.status(200).send({
            success: true,
            data: {
                author
            }
        });

    } catch(err) {
        
        return res.status(500).send({
            success: false,
            data: err.message
        });
    }
}

// Update - Uppdaterar ett kort i databasen
const update = async(res, req) => {
    try {

        let author = await authors.where({ 'id' : req.params.id }).fetch({ require : true });

        author = await author.set(req.body).save();

        return res.status(200).send({
            sucess: true,
            data: {
                author
            }
        })

    } catch (err) {
        return res.status(500).send({
            success: false, 
            data: err.message
        });
    }
}

const destroy = async(req, res) => {
    try {

        let author = await authors.where({ 'id' : req.params.id }).fetch({ require : true });
        author = await author.destroy();

        return res.status(200).send({
            success: true,
            data: {
                author
            }
        });

    } catch (err) {
        return res.status(500).send({
            success: false,
            data: err.message
        })
    }
}

module.exports = {
    create,
    read,
    update,
    destroy
}