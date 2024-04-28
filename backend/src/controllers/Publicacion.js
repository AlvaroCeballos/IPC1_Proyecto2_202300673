const Object_Post = require('../objects/PublicacionObj')

const { list_users, list_publicacion } = require('../DataList/dataList')

var kontador = 0

function nuevaPublicacion(req, res) {
    try{
        const codigo = req.body.codigo
        const descripcion = req.body.descripcion
        const imagen = req.body.imagen
        const categoria = req.body.categoria
        const anonimo = req.body.anonimo
        
       
       

        kontador = kontador + 1
        console.log(kontador)

        const newPost = new Object_Post(kontador, codigo, descripcion, imagen, categoria, anonimo)
        list_publicacion.push(newPost)

        res.json(
            {
                mensaje: 'Todod bien con la publicación :D'
            }
        )
    }catch(error){
        console.log(error)
        return res.json(
            {
                error: "Error al almacenar la publicación >:("
            }
        )
    }
 
}








function CargaMasivaPubli(req, res) {
    try {
        const publiArray =req.body
        console.log(publiArray)
       

        for (const usuarioCM of publiArray) {
            const { codigo, descripcion, imagen, categoria, anonimo } = usuarioCM

           

        const newPost = new Object_Post(codigo, descripcion, imagen, categoria, anonimo)
        list_publicacion.push(newPost)
            
        }
         
        res.json(
            {
                mensaje: "Carga masiva user exitosa",
              
            }
        )
    } catch (error) {
        console.log(error)
        return res.json(
            {
            error: "Hubo un error al hacer carga masiva user"
             }
        )
    }
}


function getPublicaciones(req, res) {
    try{
        const posts_con_usuario = [];

        for (const PublicacionObj of list_publicacion) {

            const usuario = list_users.find(user => user.codigo === PublicacionObj.user);
           



            if (usuario) {
                const post_con_usuario = {
                    codigo: PublicacionObj.codigo,
                    descripcion: PublicacionObj.descripcion,
                    imagen: PublicacionObj.imagen,
                    fechaHora: PublicacionObj.fechaHora,
                    categoria: PublicacionObj.categoria,
                    anonimo: PublicacionObj.anonimo,
                    user: usuario.nombres + " " + usuario.apellidos,
                    karrera: usuario.carrera + " (" + usuario.facultad+")"

                    
                   
                };
              
               
                posts_con_usuario.push(post_con_usuario);
            }
        }

       
        res.json(
            {
                publicaciones: posts_con_usuario
            }
        )
    }catch(error){
        console.log(error)
        return res.json(
            {
                error: "Error al almacenar la publicación get >:("
            }
        )
    }
 
}

module.exports= {
    nuevaPublicacion,
    getPublicaciones,
    CargaMasivaPubli
}












