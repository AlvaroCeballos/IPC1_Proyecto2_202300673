const { list_users } = require('../DataList/dataList')

function UpdateUser(req, res) {
    try {
        const { codigo, nombres, apellidos, genero, facultad, carrera, correo, contrasenia } = req.body

        const usuarioIndex = list_users.findIndex(x_user => x_user.codigo === codigo)
        
        if (usuarioIndex !== -1) {
           
            const usuarioActualizar= list_users[usuarioIndex]

          
            usuarioActualizar.nombres=nombres
            usuarioActualizar.apellidos=apellidos
            usuarioActualizar.genero=genero
            usuarioActualizar.facultad=facultad
            usuarioActualizar.carrera=carrera
            usuarioActualizar.correo=correo
            usuarioActualizar.contrasenia=contrasenia

            res.json(
                {
                    mensanje: "Usuario actualizado correctamente"
                }
            )

        } else {
           
            res.json(
                {
                    error: "Error al actualizar el Usuario no existe"
                }
            )
        }
    } catch (error) {
        console.log(error)
         
        return res.json(
            {
                error: "Ocurrió un error al actualizar el usuario"
            }
        )
    }
}

module.exports= {
    UpdateUser
}

