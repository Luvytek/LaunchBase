
const express = require('express')
const routes = express.Router()
const RecipesController = require('../app/controllers/RecipesController.js')
const multer = require('../app/middlewares/multer')

// ADMIN RECIPES

routes.get('/', RecipesController.index)
routes.get('/create', RecipesController.create)
routes.get('/:id', RecipesController.show)
routes.get('/:id/edit', RecipesController.edit)

routes.post('/', multer.array("photos", 5), RecipesController.post)
routes.put('/', multer.array("photos", 5), RecipesController.put)
routes.delete('/', RecipesController.delete)

module.exports = routes