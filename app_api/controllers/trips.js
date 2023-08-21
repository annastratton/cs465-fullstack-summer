const mongoose = require('mongoose');
const Model = mongoose.model('trips');

const tripsList = async (req, res) => {
    Model
    .find({})
    .exec((err, trips) => {
        if (err || !trips) {
            return res
                .status(404)
                .json(err || { "message" : "trips not found"});
        }
        return res
            .status(200)
            .json(trips);
    });
};

const tripsFindByCode = async (req, res) => {
    Model
    .find({ 'code': req.params.tripCode })
    .exec((err, trip) => {
        if (err || !trip) {
            return res
                .status(404)
                .json(err || { "message" : "trip not found"});
        }
        return res
            .status(200)
            .json(trip);
    });
};

const tripsAddTrip = async (req, res) => {
    Model
    .create(req.body, (err, trip) => {
        if (err || !trip) {
            return res
                .status(404)
                .json(err || { "message" : "trip not found"});
        }
        return res
            .status(201)
            .json(trip);
    });
};

const tripsUpdateTrip = async (req, res) => {
    Model
    .findOneAndUpdate({ 'code': req.params.tripCode }, req.body, { new: true })
    .then(trip => {
        if (!trip) {
            return res
                .status(404)
                .send({ "message" : "Trip not found with code " + req.params.tripCode });
        }
        return res.send(trip);
    })
    .catch(err => {
        if (err.kind === 'ObjectId') {
            return res
                .status(404)
                .send({ "message" : "Trip not found with code " + req.params.tripCode });
        }
        return res
            .status(500)
            .json(err);
    });
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
