require('express-async-errors') // Pega api para verificação dos erros
require("dotenv/config")
const migrationsRun = require('./database/sqlite/migrations')

const AppError = require('./utils/AppError')
const cors = require("cors")

const express = require('express')
const uploadConfig = require("./configs/upload")

const routes = require('./routes') // Serve para juntar os grupos de rota

const app = express()
app.use(express.json()) // Conseguir ler em JSON
app.use(cors())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes)
migrationsRun(); // EXECUTA O BANCO, E CRIA A TABELA SE NÃO TIVER

app.use((error, request, response, next) => {
  if (error instanceof AppError) { // Se tiver erro executa
    return response.status(error.statusCode).json({
      status: 'error',
      statusCode: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    message: 'internal server error'
  })
})

const port = 3333
app.listen(port, () => console.log(`Server listening on ${port}`))    
