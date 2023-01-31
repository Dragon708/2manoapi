import { prisma } from "../../prisma.cliente.js"

export async function SignIn (email) {
   
      const user  = await prisma.User.findUnique({
        where : {
          email: email,
        
        }
      } )

      return user
  
    
      
    

  

  }
    
    
    

 

