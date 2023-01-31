import { prisma } from "../../prisma.cliente.js";

export async function actualizarServicio(id) {
    const datos = await prisma.user.findUnique({
        where:{
            id: id
        }
})
console.log(datos)
    const data = await prisma.user.update({
        where:{
            id: id
        }, data:{
            servicio: !datos.servicio
        }
    })
    return data
}