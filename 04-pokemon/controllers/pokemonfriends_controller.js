const pokemonFriends = require('../models/pokemonFriends');

// Create - skapa ett kort i databasen
const create = async(req, res) => {
    try {

        let friend = await new pokemonFriends(req.body).save();

        return res.status(201).send({
            success: true,
            data: {
                friend
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

        let friend;

        if (req.params.id) {
            friend = await pokemonFriends.where({ 'id' : req.params.id }).fetch( { require: false, withRelated: ['cards'] });
        } else {
            friend = await pokemonFriends.fetchAll({ withRelated: ['cards'] });
        }

        if(!friend) {
            return res.status(400).send({ 
                success: false,
                data: 'Not found'
            });
        }
        

        return res.status(200).send({
            success: true,
            data: {
                friend
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

        let friend = await pokemonFriends.where({ 'id' : req.params.id }).fetch({ require : true });

        friend = await friend.set(req.body).save();

        return res.status(200).send({
            sucess: true,
            data: {
                friend
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

        let friend = await pokemonFriends.where({ 'id' : req.params.id }).fetch({ require : true });
        friend = await friend.destroy();

        return res.status(200).send({
            success: true,
            data: {
                friend
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