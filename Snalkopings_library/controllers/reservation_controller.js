const reservations = require('../models/reservation');
const log = require('../logging.js')

// Create - skapa ett kort i databasen
const create = async(req, res) => {
    try {

        let reservation = await new reservations(req.body).save();

        return res.status(201).send({
            success: true,
            data: {
                reservation
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

        let reservation;

        if (req.params.id) {
            reservation = await reservations.where({ 'id' : req.params.id }).fetch( { require: false });
        } else {
            reservation = await reservations.fetchAll();
        }

        if(!reservation) {
            return res.status(400).send({ 
                success: false,
                data: 'Not found'
            });
        }
        

        return res.status(200).send({
            success: true,
            data: {
                reservation
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

        let reservation = await reservations.where({ 'id' : req.params.id }).fetch({ require : true });

        reservation = await reservations.set(req.body).save();

        return res.status(200).send({
            sucess: true,
            data: {
                reservation
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

        let reservation = await reservations.where({ 'id' : req.params.id }).fetch({ require : true });
        reservation = await reservations.destroy();

        return res.status(200).send({
            success: true,
            data: {
                reservation
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