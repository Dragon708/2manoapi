

import { Router } from "express";
import { authenticateToken } from "../../Auth/middleware/authenticatorJwt.js";
import { readUsersById } from "../../Auth/Controllers/readUsers.js";
import { deletePublic, updateLikes, updatePublicaciones, writePublicaciones } from "../Controllers/postPublicacion.js";
import { readPublicaciones, readPublicacionesByCategoria, readPublicacionesById, readPublicacionesByMuni, readPublicacionesByPrecio, readPublicacionesByPriority, readPublicacionesByProv, readPublicacionesBySearch, readPublicacionesByTwoArgument } from "../Controllers/readPublicaciones.js";
import { upload } from "../../mullerConfig.js";


const routesPublicaciones = Router()



//READ-------PUBLICACIONES

//read All Publicaciones 

routesPublicaciones.get('/all',authenticateToken ,async (req, res) => {
    const data = await readPublicaciones()
    res.send(data)
  })
  
//read my Publicaciones by id
routesPublicaciones.get('/id',authenticateToken ,async (req, res) => {
  const { id } = req.body
  const data = await readPublicacionesById(id)
  res.send(data)
})

//search publicaciones por priotity
routesPublicaciones.get('/priority',authenticateToken ,async (req, res) => {
  const { priority } = req.body
  const data = await readPublicacionesByPriority(priority)
  res.send(data)
})
//read publicaciones por titulo 

routesPublicaciones.get('/search',authenticateToken ,async (req, res) => {
  const {consulta} = req.body
  const data = await readPublicacionesBySearch(consulta)
  res.send(data)
})
//search publicaciones por Date al final decidi no ponerlo

//read publicaciones bi categoria
routesPublicaciones.get('/categoria',authenticateToken ,async (req, res) => {
  const { categoria } = req.body
  const data = await readPublicacionesByCategoria(categoria)
  res.send(data)
})

//read publicaciones por provincia
routesPublicaciones.get('/provincia',authenticateToken ,async (req, res) => {
  const { provincia } = req.body
  const data = await readPublicacionesByProv(provincia)
  res.send(data)
})
//read publicaciones por municipio
routesPublicaciones.get('/municipio',authenticateToken ,async (req, res) => {
  const { municipio } = req.body
  const data = await readPublicacionesByMuni(municipio)
  res.send(data)
})
//read publicaciones by precio 
routesPublicaciones.get('/precio',authenticateToken ,async (req, res) => {
  const {precio} = req.body
  console.log(precio)
  const data = await readPublicacionesByPrecio(precio)
  res.send(data)
})
// read publicaciones por dos parametros
routesPublicaciones.get('/parametros',authenticateToken ,async (req, res) => {
  const Datos = req.body
  const data = await readPublicacionesByTwoArgument(Datos)
  res.send(data)
})


// POST------PUBLICACIONES

//Post publicaciones bi id and servicio
routesPublicaciones.post('/publicar',authenticateToken, upload , async (req, res) => {
  const imagen = req.file
  const Datos = req.body
  console.log(Datos)
  console.log(imagen)
  const id  = Datos.owner
  
  try {
    const verify = await readUsersById(id)
    console.log(verify.servicio)
    if (!verify.servicio ) return res.status(400).json({error: 'No Authorizadosss'})
    const data = await writePublicaciones(Datos, imagen)
    res.send(data)
  } catch (error) {
    console.log(error)
    res.status(401).json({error: error.message})
  }
})

//update publicaciones 
routesPublicaciones.post('/update',authenticateToken ,async (req, res) => {
  const Datos = req.body
  const {owner} = Datos
  try {
    const verify = await readUsersById(owner)
    console.log(verify.servicio)
    if (!verify.servicio ) return res.status(400).json({error: 'No Authorizado'})
    const data = await updatePublicaciones(Datos)
    res.send(data)
  } catch (error) {
    res.status(401).json({error: 'No Authorizado'})
  }
})


routesPublicaciones.post('/likes',authenticateToken ,async (req, res) => {
  const Datos = req.body
  try {
    const data = await updateLikes(Datos)
    res.send(data)
  } catch (error) {
    res.status(401).json({error: 'No Authorizado'})
  }
})

routesPublicaciones.delete('/delete',authenticateToken ,async (req, res) => {
  const Datos = req.body
  try {
    const data = await deletePublic(Datos)
    res.status(200).send('Publicacion eliminada')
  } catch (error) {
    res.status(401).json({error: 'No Authorizado'})
  }
})



export default routesPublicaciones ;