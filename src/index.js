import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import routesGeneral from '../src/Routes/routes.general.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/', routesGeneral )

app.use('/*', (req,res)=>{
  res.status(404).json({
      message: 'Ruta No encontrada'
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

