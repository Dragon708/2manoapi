

import { prisma } from "../../prisma.cliente.js"




export async function readPublicaciones () {
  const publicaciones = await prisma.publicaciones.findMany()
  return publicaciones
  
}
export async function readPublicacionesById (id) {

  const publicaciones = await prisma.publicaciones.findMany({
    where:{
      owner: id
    },
    orderBy:{
      createdAt: 'desc'
    }
  })
  return publicaciones
  
}
export async function readPublicacionesByPriority (priority) {
    const publicaciones = await prisma.publicaciones.findMany({
    where:{
      priority: priority
    },
    orderBy:{
      createdAt: 'desc'
    }
  })
  return publicaciones
}
export async function readPublicacionesBySearch (consulta) {
  
  const publicaciones = await prisma.publicaciones.findMany({
     where:{
      OR:[
        {titulo: {search: consulta }},
        {titulo: {search: `${consulta.toLowerCase()} | ${consulta.toUpperCase()} ` }},
        {descripcion:{contains: consulta}}
      ]
      },
      orderBy:{
        createdAt: 'desc'
      }
  })
    return publicaciones
   
}
export async function readPublicacionesByCategoria (categoria) {
  const publicaciones = await prisma.publicaciones.findMany({
    where:{
      categoria: categoria
    },
    orderBy:{
      createdAt: 'desc'
    }
  })
  return publicaciones
}
export async function readPublicacionesByProv (provincia) {
  const publicaciones = await prisma.publicaciones.findMany({
    where:{
      provincia: provincia
    },
    orderBy:{
      createdAt: 'desc'
    }
  })
  return publicaciones
}
export async function readPublicacionesByMuni (municipio) {
  const publicaciones = await prisma.publicaciones.findMany({
    where:{
      municipio: municipio
    },
    orderBy:{
      createdAt: 'desc'
    }
  })
  return publicaciones
}
export async function readPublicacionesByPrecio (precio) {
  const {max , min} = precio
  
  const publicaciones = await prisma.publicaciones.findMany({
    where:{
      AND :[{
        precio : {
          gte: min
        }},{
          precio:{
            lte: max
          }

        }
      ]
    },
    orderBy:{
      createdAt: 'desc'
    }
  })
  return publicaciones
}
export async function readPublicacionesByTwoArgument (Datos) {
  const {consulta ,  precio} = Datos
  const {max , min} = precio
  console.log(consulta, precio)
  const publicaciones = await prisma.Publicaciones.findMany({
      where:{
        OR:[
          {titulo: {search: consulta }},
          {titulo: {search: `${consulta.toLowerCase()} | ${consulta.toUpperCase()} ` }},
          {descripcion:{contains: consulta}}
        ],  
        AND :[{
          precio : {
            gte: min
          }},{
            precio:{
              lte: max
            }
  
          }
        ]
    },
    orderBy:{
      createdAt: 'desc'
    }
})
return publicaciones
}
