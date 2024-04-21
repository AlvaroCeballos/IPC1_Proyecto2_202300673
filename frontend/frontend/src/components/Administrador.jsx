import React, { useState, useEffect } from "react";
import './Styles/Styles.css'
import { useCookies } from 'react-cookie';
import { Modal } from "react-bootstrap";


function Administrador() {
    const [cookies, setCookies] = useCookies(['usuario'])
    const [user, setUser] = useState(cookies.usuario)
    const [listaUser, setlistaUser] = useState([])
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
    const [actualizarTabla, setActualizarTabla] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:5000/GetAllUsers`, {
            method: "GET", // se hace solicitud tipo get
          
            headers: {
                "Content-Type": "application/json",
            },
        })


            .then((response) => response.json())
            .then((res) => {

                setlistaUser(res.usuarios)
                console.log(listaUser)
                

               
            })
            .catch((error) => console.error(error))

    }, [actualizarTabla])

    const borrarUsuario = (carnet_seleccionado) => {

        const MyJson = {
            carnet: carnet_seleccionado
        }

        fetch(`http://localhost:5000/delete`, {
            method: "DELETE", // metodo eliminar
            body: JSON.stringify(MyJson),
            headers: {
                "Content-Type": "application/json", 
            },
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.mensaje) {
                    alert(res.mensaje)
                  setActualizarTabla(!actualizarTabla)
                } else {
                    alert(res.error)
                }

            })
            .catch((error) => console.error(error))




    }

    const verInfo=(user)=>{
        setUsuarioSeleccionado(user)
    }

    const cerrarVentanaInfo=()=>{
        setUsuarioSeleccionado(null)
    }
    return (
        <div className="admin-background">
            


            <h1 style={{ color: "white" }}>{user.carnet}</h1>
            <h1 style={{ color: "white" }}>{user.nombre}</h1>
            <div className="centrar-tabla">
            <div className="table-container">
            <table className="table table-bordered text-center tablaUsers">
                <thead>
                    <tr>
                        <th >Carnet</th>
                        <th >Nombre</th>
                        <th >Edad</th>
                        <th >Facultad</th>
                        <th >Acciones</th>
                    </tr>
                </thead>
                <tbody >
                    {listaUser.map((user) => (
                        <tr key={user.carnet}>
                            <td>{user.carnet}</td>
                            <td>{user.nombre}</td>
                            <td>{user.edad}</td>
                            <td>{user.facultad}</td>
                            <td>
                                <button className="btn btn-primary" onClick={()=>verInfo(user)}>Ver</button>
                                <button className="btn btn-danger"  onClick={()=>borrarUsuario(user.carnet)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
               {// se ejecuta mostrando los datos solo si es distinto de null
}
            {usuarioSeleccionado &&(
                <Modal show={true} onHide={cerrarVentanaInfo}>

                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Carnet: {usuarioSeleccionado.carnet} </p>
                    <p>Nombre: {usuarioSeleccionado.nombre} </p>
                    <p>Edad: {usuarioSeleccionado.edad} </p>
                    <p>Facultad: {usuarioSeleccionado.facultad} </p>
                </Modal.Body>

                <Modal.Footer>
                    <button variant="secondary" onClick={cerrarVentanaInfo}>
                        Cerrrar
                    </button>
                </Modal.Footer>
            </Modal>

            )

            }

</div>
        </div>
        </div>

    )

}

export default Administrador;