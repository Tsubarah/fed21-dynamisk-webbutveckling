const users = require('../models/user');
const log = require('../logging.js');

// Create - skapa ett kort i databasen
const create = async(req, res) => {
    try {

        let user = await new users(req.body).save();

        return res.status(201).send({
            success: true,
            data: {
                user
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

        let user;

        if (req.params.id) {
            user = await users.where({ 'id' : req.params.id }).fetch( { require: false });
        } else {
            user = await users.fetchAll();
        }

        if(!user) {
            return res.status(400).send({ 
                success: false,
                data: 'Not found'
            });
        }
        

        return res.status(200).send({
            success: true,
            data: {
                user
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

        let user = await users.where({ 'id' : req.params.id }).fetch({ require : true });

        user = await user.set(req.body).save();

        return res.status(200).send({
            sucess: true,
            data: {
                user
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

        let user = await users.where({ 'id' : req.params.id }).fetch({ require : true });
        user = await user.destroy();

        return res.status(200).send({
            success: true,
            data: {
                user
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