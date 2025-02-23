const titles = require('../models/titles');
const log = require('../logging.js');

// Create - skapa ett kort i databasen
const create = async(req, res) => {
    try {

        let title = await new titles(req.body).save();

        return res.status(201).send({
            success: true,
            data: {
                title
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

        let title;

        if (req.params.id) {
            title = await titles.where({ 'id' : req.params.id }).fetch( { require: false });
        } else {
            title = await titles.fetchAll();
        }

        if(!titles) {
            return res.status(400).send({ 
                success: false,
                data: 'Not found'
            });
        }
        

        return res.status(200).send({
            success: true,
            data: {
                title
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

        let title = await titles.where({ 'id' : req.params.id }).fetch({ require : true });

        title = await titles.set(req.body).save();

        return res.status(200).send({
            sucess: true,
            data: {
                title
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

        let title = await titles.where({ 'id' : req.params.id }).fetch({ require : true });
        title = await titles.destroy();

        return res.status(200).send({
            success: true,
            data: {
                title
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