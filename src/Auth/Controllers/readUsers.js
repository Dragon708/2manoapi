

import { prisma } from "../../prisma.cliente.js"




export async function readUsers () {
    const user = await prisma.User.findMany()
      return user
     
}
export async function readUsersById (id) {
  const user = await prisma.User.findUnique({
    where: {
      id: id
    }
  })
    return user
   
}
