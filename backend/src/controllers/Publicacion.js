const Object_Post = require('../objects/PublicacionObj')

const { list_users, list_publicacion } = require('../DataList/dataList')

var id_publicacion = 0

function nuevaPublicacion(req, res) {
    try{
        const codigo = req.body.codigo
        const descripcion = req.body.descripcion
        const imagen = req.body.imagen

        id_publicacion = id_publicacion + 1
        console.log(id_publicacion)

        const newPost = new Object_Post(id_publicacion, codigo, descripcion, imagen)
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


function getPublicaciones(req, res) {
    try{
        const posts_con_usuario = [];

        for (const PublicacionObj of list_publicacion) {

            const usuario = list_users.find(user => user.codigo === PublicacionObj.user);
           



            if (usuario) {
                const post_con_usuario = {
                    id: PublicacionObj.id,
                    descripcion: PublicacionObj.descripcion,
                    imagen: PublicacionObj.imagen,
                    fechaHora: PublicacionObj.fechaHora,
                    user: usuario.nombres,
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
    getPublicaciones
}












