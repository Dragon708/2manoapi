import { prisma } from "../../prisma.cliente.js";



export async function writePublicaciones(Datos) {
const publicaciones = await prisma.publicaciones.create({
    data: Datos
}) 
return publicaciones;
}


export async function updatePublicaciones(Datos) {
    const publicaciones = await prisma.publicaciones.update({
        where:{
            id: Datos.id
        },
        data: Datos
    }) 
    return publicaciones;
    }

export async function updateLikes(Datos) {
        const publicaciones = await prisma.publicaciones.update({
            where:{
                id: Datos.id
            },
            data: {
                likes: Datos.likes
            }
         }) 
        return publicaciones;
}
export async function deletePublic(Datos) {
    const publicaciones = await prisma.publicaciones.delete({
    where:{
        id: Datos.id
    }
     }) 
    return publicaciones;
}