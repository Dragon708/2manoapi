import { prisma } from "../../prisma.cliente.js";



export async function writePublicaciones(Datos, imagen) {
    const publicaciones = await prisma.publicaciones.create({
    data: {
        owner: parseInt(Datos.owner),
        moneda: Datos.moneda,
        precio: parseInt(Datos.precio),
        priority: parseInt(Datos.priority),
        provincia: Datos.provincia,
        titulo:Datos.titulo,
        categoria:Datos.categoria,
        descripcion:Datos.descripcion,
        imagen: `/Upload/${imagen.filename}`,
        likes:parseInt(Datos.likes),
        municipio:Datos.municipio
    }
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