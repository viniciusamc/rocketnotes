const { Router } = require("express")

const NotesController = require("../controllers/NotesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const notesRoutes = Router()

const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated)

notesRoutes.post('/', notesController.create)
notesRoutes.get('/:id', notesController.show)
notesRoutes.delete('/:id', notesController.delete)
notesRoutes.get('/', notesController.index) // como passa pela query, n precisa usar o parâmetro 

module.exports = notesRoutes; // Exportando pra quem quiser utilizar o arquivo 