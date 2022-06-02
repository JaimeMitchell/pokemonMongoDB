const mongoose = require('mongoose')

const pokemonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Pokemon', pokemonSchema)