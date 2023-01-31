
import { Router } from "express";
import routesUser from "../Auth/Routes/routes.Auth.js";
import routesPublicaciones from "../Publicaciones/Routes/routes.Publicaciones.js";

const routesGeneral = Router()

routesGeneral.use('/User', routesUser)
routesGeneral.use('/Public', routesPublicaciones)


export default routesGeneral ;