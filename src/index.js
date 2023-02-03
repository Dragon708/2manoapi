import express from 'express'

import dotenv from 'dotenv'
import routesGeneral from '../src/Routes/routes.general.js'
import bodyParser from 'body-parser'
import path from 'path'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config()
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({extended: true}))


app.use('/', routesGeneral )
app.use(express.static(path.join(__dirname , 'public')))

app.use('/*', (req,res)=>{
  res.status(404).json({
      message: 'Ruta No encontrada'
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

