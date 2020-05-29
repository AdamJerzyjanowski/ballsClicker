const Player = require('../models/player.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    
    /*if(!req.body) {
        return res.status(400).send({
            message: "Player content can not be empty"
        });
    }*/
        // Create a Note
        const player = new Player({
            name: req.body.name || "No name", 
            points: req.body.points
        });
    
        // Save Note in the database
        player.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Player."
            });
        });
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Player.find().sort( '-points'
    )
    .then(players => {
        res.send(players);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving player."
        });
    });
};
 exports.findOne = (req, res) => {
        Note.findById(req.params.playerId)
        .then(player => {
            if(!player) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.playerId
                });            
            }
            res.send(player);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.playerId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.playerId
            });
        });
    };