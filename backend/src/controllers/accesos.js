const { list_users } = require('../DataList/dataList')
const Usuario = require('../objects/Usuario')

function SignUp(req, res) {

    try {
        const { codigo, nombres, apellidos, genero, facultad, carrera, correo, contrasenia } = req.body

        const usuarioExiste = list_users.find(x_user => x_user.codigo === codigo)

        if (usuarioExiste) {
            return res.json({ error: 'El codigo ya está registrado.' });
        }

        const newUser = new Usuario(codigo, nombres, apellidos, genero, facultad, carrera, correo, contrasenia)
        list_users.push(newUser) 

   
        return res.json({ mensaje: 'Usuario fue agregado correctamente :D' });
        

    } catch (error) {
        console.log(error)
        return res.json(
            {
            error: "Hubo un error al registrar el usuario"
             }
        )
    }
}




function CargaMasiva(req, res) {
    try {
        const userArray =req.body
        console.log(userArray)
       

        for (const usuarioCM of userArray) {
            const { codigo, nombres, apellidos, genero, facultad, carrera, correo, contrasenia } = usuarioCM

            const usuarioExiste = list_users.find(x_user => x_user.codigo === codigo)

        if (usuarioExiste) {
            res.json(
                {
                    mensaje: "Un usuario o mas con user repetido, solo se agrego 1",
                  
                })
            continue
        }

        

            const newUser = new Usuario(codigo, nombres, apellidos, genero, facultad, carrera, correo, contrasenia)
            list_users.push(newUser) 
            
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

















function GetAllUsers(req, res) {
    try {
        res.json(
            {
                usuarios: list_users
            }
        )
    } catch (error) {
        console.log(error)
        return res.json(
            {
            error: "Hubo un error al obtener los usuarios"
             }
        )
    }
}









function Login(req, res){
    try {
        const carnet1 = req.body.codigo
        const password1 = req.body.password
        const usuarioEncontrado = list_users.find(x_user => x_user.codigo === carnet1 && x_user.password === password1)
        
        if (usuarioEncontrado) {

            const userFind={
                codigo: usuarioEncontrado.codigo,
                nombres:usuarioEncontrado.nombres,
                apellidos:usuarioEncontrado.apellidos,
                genero:usuarioEncontrado.genero,
                facultad:usuarioEncontrado.facultad,
                carrera:usuarioEncontrado.carrera,
                correo:usuarioEncontrado.correo, 
            }

            res.json(
                {
                    encontrado:true,
                    datos:userFind
                }
                
                )


            return res.json({ mensaje: 'Usuario logueado correctamente :D' });
        } else {
            return res.json(
                { 
                    encontrado:false,
                    error: 'Usuario o contraseña incorrecta' 
                }
                )
        }
        
    } catch (error) {
        console.log(error)
        return res.json(
            {
            error: "Hubo un error en el login"
             }
        )
    }
}

module.exports= {
    SignUp, GetAllUsers, Login, CargaMasiva
}