import jwt from 'jsonwebtoken'

function jwtTokens({id, name, email, password , servicio}){
    const user = {id, name, email}
    const publicaciones = {id,name,email,password,servicio}
    const accessToken = jwt.sign(user,process.env.SECRET)
    const publicarToken = jwt.sign(publicaciones,process.env.PUBLICSECRET)
    return {accessToken, publicarToken}

}
export {jwtTokens}