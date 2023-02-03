import { prisma } from "../../prisma.cliente.js"
import bcrypto from 'bcrypt'




export async function readUsers () {
    const user = await prisma.User.findMany()
      return user
     
}
export async function readUsersById (id) {
  
  const user = await prisma.User.findUnique({
    where: {
      id: parseInt(id)
    }
  })
    return user
   
}

export async function deleteUsuario (id){
  const user = await prisma.User.delete({
    where:{
      id: parseInt(id) 
    }
  })
    return user
   
}

export async function actualizarDatos(Datos) {
  const {id} = Datos

  const data = await prisma.user.update({
      where:{
          id: id
      }, data: Datos
  })
  return data
}


export async function actualizarPassword(Datos){
  const {id, oldPassword ,email , password} = Datos
  const user = await readUsersById(id) 
  console.log(user)
  const validPassword = await bcrypto.compare(oldPassword, user.password)
  console.log(validPassword)
  if(!validPassword)return 'Password Incorrecto'
  const hashNewPassword = await bcrypto.hash(password,10)
  const data = await prisma.user.update({
    where: {
      email: email
    },
      data:{
    password: hashNewPassword
  }})
  return data
}