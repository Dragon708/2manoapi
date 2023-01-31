

import { prisma } from "../../prisma.cliente.js"
import bcrypto from 'bcrypt'



export async function SignUp (data) {
  const { email , password ,name , lastname , telefono  } = data
  const hashpassword = await bcrypto.hash(password,10)
  
    const user = await prisma.User.create({
        data : {
          email: email,
          password: hashpassword,
          name: name,
          lastname: lastname,
          telefono: telefono
        }
      } )
      return user
    
  
    
  
}
