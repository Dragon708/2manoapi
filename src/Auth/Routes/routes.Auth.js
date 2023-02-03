
import {jwtTokens} from '../middleware/Jwt.config.js'
import { Router } from "express";
import { SignIn } from "../Controllers/User.SignIn.js";
import { SignUp } from "../Controllers/User.SignUp.js";
import bcrypto from "bcrypt";
import { actualizarDatos, actualizarPassword, deleteUsuario, readUsers } from '../Controllers/readUsers.js';
import { authenticateToken } from '../middleware/authenticatorJwt.js';
import { actualizarServicio } from '../Controllers/switchServicio.js';




const routesUser = Router()

routesUser.get('/users',authenticateToken, async (req, res) =>{
  try {
    const respuesta = await readUsers()
    console.log(respuesta)
    res.send(respuesta).json()
  }
  catch (error) {
    res.status(500).send( 'NO Esta Authorizado Para Este Servicio')
  }
  
})



//Creacion de usuarios
routesUser.post('/SignUp', async (req, res) =>{

    try {
      const data  = req.body
      const respuesta = await SignUp(data)
      console.log(respuesta)
      res.send(respuesta).json()
    }
    catch (error) {
      res.status(404).json({Message :'Usuario Con Este Email o Numero de Telefono ya Existe'})
      
    }
    
})

//Login Usuarios
routesUser.post('/SignIn', async  (req, res) =>{
  try {
    const {email,password} = req.body
    const respuesta = await SignIn(email)
    const validPassword = await bcrypto.compare(password, respuesta.password)
    if(!validPassword) return res.status(401).json({ error: 'Password incorrect'})
    let {accessToken} = jwtTokens(respuesta)
    res.cookie('accessToken',accessToken,{httpOnly: true})
    res.send({id: respuesta.id, name: respuesta.name, lastname: respuesta.lastname, email: respuesta.email, telefono: respuesta.telefono, servicio: respuesta.servicio})
  }
  catch (error) {
    res.status(401).json({error: 'Email O Password Incorrecto'})
    
  }
})

// Editar Datos Usuarios (menos Email y password)
routesUser.post('/editDatos', async (req, res) =>{
  try {
    const Datos = req.body
    const respuesta = await actualizarDatos(Datos)
    res.status(200).json('Los Datos Personales han Sido Cambiado Con Exito')
}catch (error) {
  res.status(500).send( 'Usuario No Existe')
}}
)

//Editar Datos 'Servicio' Usuarios Para Poder Publicar
routesUser.post('/editServicio', async (req, res) =>{
  try {
    const {id} = req.body
    const respuesta = await actualizarServicio(id)
    res.send(respuesta)
}catch (error) {
  res.status(500).send( 'Usuario No Existe')
}}
)

//Cambiar Password Usuario
routesUser.post('/editPassword', async (req, res) =>{
  try {
    const Datos = req.body
    const respuesta = await actualizarPassword(Datos)
    console.log(respuesta)
    res.send(respuesta)
}catch (error) {
  res.status(500).send( 'Usuario No Existe')
}}
)

//Eliminar Usuario

routesUser.delete('/delete', async (req,res)=>{
  try {
    const {id} = req.body
    const respuesta = await deleteUsuario(id)
    res.status(200).json(`Usuario con ID: ${respuesta.id} y Correo: ${respuesta.email} Eliminado Correctamente`)
  } catch (error) {
    res.status(500).send("Usuario No Existe")
  }
 })

export default routesUser ;