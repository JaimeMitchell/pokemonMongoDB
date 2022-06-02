const express = require('express')
const pokemonData = require('./models/pokemon')
//Set up dotenv 
require('dotenv').config()
// Using Node.js `require()`
const mongoose = require('mongoose');
// add a img property to the object
const pokemonModel = require('./models/pokemonModel')


//* ========== SETUP
const app = express()
const PORT = 3000
app.set('view engine', 'ejs')
app.set('views', './views')

//* ======== Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//* ========== ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to the Pokemon App!')
})

app.get('/pokemon', (req, res) => {
    res.render('index', {
        pageTitle: 'Pokemon',
        pageHeader: 'See All The Pokemon!',
        pokemonData: pokemonData
    })
})

app.get('/pokemon/new', (req, res) => {
    res.render('new', {
        pageTitle: 'New Pokemon',
        pageHeader: 'Create a new Pokemon'
    })
})

//* POST REQUEST HANDLER
app.post('/pokemon', async (req, res) => {
    const newPokemon = req.body //create a new pokemon variable and save object in it
    //add an img property to the object
    newPokemon.img = `http://img.pokemondb.net/artwork/${req.body.name}`
    console.log(newPokemon)
    // Save the new pokemon to the db
    await pokemonModel.create(newPokemon, (error, result) => {
        if (error) {
            console.log(error)
        }
        console.log(result)
    })
})

app.get('/pokemon/:id', (req, res) => {
    // res.send(req.params.id)

    res.render('show', {
        pageTitle: 'Details',
        pageHeader: " Gotta Catch 'Em All ",
        pokemon: pokemonData[req.params.id]
    })
})

//* =========== LISTENER
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    mongoose.connect(process.env.MONGODB_URI)// We use Mongoose to connect to mongoDB 
    console.log('MongoDB Connected')
})