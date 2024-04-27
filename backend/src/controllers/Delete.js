const { list_users } = require('../DataList/dataList')

function deleteUser(req, res) {
    try {

        
        const carnetDelete = req.body.codigo 
        console.log(carnetDelete)
        
        const usuarioIndex = list_users.findIndex(x_user => x_user.codigo.toString() === carnetDelete.toString())
        console.log(usuarioIndex)
        if (usuarioIndex !== -1) {
          
            list_users.splice(usuarioIndex, 1)

            res.json(
                { mensaje: 'Usuario eliminado correctamente.' }

            );
        } else {
            res.json(
                {
                    error: "Error al eliminar el usuario no existe"
                }
            )
        }

    } catch (error) {
        console.log(error)

        return res.json(
            {
                error: "Ocurrió un error al eliminar al usuario"
            }
        )
    }
}

//Exportamos la función 
module.exports = {
    deleteUser
}
