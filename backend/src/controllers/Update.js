const { list_users } = require('../DataList/dataList')

function UpdateUser(req, res) {
    try {
        const { carnet, nombre, edad, facultad, password } = req.body

        const usuarioIndex = list_users.findIndex(x_user => x_user.carnet === carnet)
        
        if (usuarioIndex !== -1) {
           
            const usuarioActualizar= list_users[usuarioIndex]

          
            usuarioActualizar.nombre=nombre
            usuarioActualizar.edad=edad
            usuarioActualizar.facultad=facultad
            usuarioActualizar.password=password

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