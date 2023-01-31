
import {jwtTokens} from '../middleware/Jwt.config.js'
import { Router } from "express";
import { SignIn } from "../Controllers/User.SignIn.js";
import { SignUp } from "../Controllers/User.SignUp.js";
import bcrypt from "bcrypt";
import { readUsers } from '../Controllers/readUsers.js';
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
    const validPassword = await bcrypt.compare(password, respuesta.password)
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


//Eliminar Usuario
// routesUser.delete('delete', (req,res))

export default routesUser ;