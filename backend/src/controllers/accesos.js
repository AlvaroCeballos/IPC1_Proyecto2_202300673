const { list_users } = require('../DataList/dataList')
const Usuario = require('../objects/Usuario')

function SignUp(req, res) {

    try {
        const { carnet, nombre, edad, facultad, password } = req.body

        const usuarioExiste = list_users.find(x_user => x_user.carnet === carnet)

        if (usuarioExiste) {
            return res.json({ error: 'El carnet ya está registrado.' });
        }

        const newUser = new Usuario(carnet, nombre, edad, facultad, password)
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
            const { carnet, nombre, edad, facultad, password } = usuarioCM

            const usuarioExiste = list_users.find(x_user => x_user.carnet === carnet)

        if (usuarioExiste) {
            res.json(
                {
                    mensaje: "Un usuario o mas con user repetido, solo se agrego 1",
                  
                })
            continue
        }

        

            const newUser = new Usuario(carnet, nombre, edad, facultad, password)
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
        const carnet1 = req.body.carnet
        const password1 = req.body.password
        const usuarioEncontrado = list_users.find(x_user => x_user.carnet === carnet1 && x_user.password === password1)
        
        if (usuarioEncontrado) {

            const userFind={
                carnet: usuarioEncontrado.carnet,
                nombre:usuarioEncontrado.nombre,
                edad:usuarioEncontrado.edad,
                facultad:usuarioEncontrado.facultad
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