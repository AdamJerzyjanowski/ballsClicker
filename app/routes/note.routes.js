module.exports = (app) => {
    const player = require('../controllers/player.controller.js');

 
    // Create a new Note
    app.post('/addPlayer', player.create);

    // Retrieve all Notes
    app.get('/players', player.findAll);

    // Retrieve a single Note with noteId
    app.get('/player/:playerId', player.findOne);

}