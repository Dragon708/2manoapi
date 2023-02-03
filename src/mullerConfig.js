import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const storage = multer.diskStorage({
    destination:  path.join(__dirname,'/public/Upload'),
      filename: (req,file,cb)=>{
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase() )
      }
    })
export const upload = multer({
    dest: path.join(__dirname,'/public/Upload'),
    storage : storage,
    limits: {fileSize: 5000000},
    fileFilter: (req,file,cb)=>{
      const filetype = /jpg|jpeg|png|gif/
      const minetype = filetype.test(file.mimetype)
      const extname = filetype.test(path.extname(file.originalname))
      if (minetype && extname){
        return cb(null,true)
      }
      cb('El Archivo no Es Una Imagen Valida')

    },

    }).single('imagen')