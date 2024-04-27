import React, { useState, useEffect } from "react";
import './Styles/Styles.css'
import { useCookies } from 'react-cookie';
import { Modal } from "react-bootstrap";
import NavBarAdmin from "./NavBarAdmin";


function Administrador() {
    const [cookies, setCookies] = useCookies(['usuario'])
    const [user, setUser] = useState(cookies.usuario)
    const [listaUser, setlistaUser] = useState([])
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
    const [actualizarTabla, setActualizarTabla] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);

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
            codigo: carnet_seleccionado
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

    const handleFileChange=(event)=>{
        setSelectedFile(event.target.files[0])
     }

    const verInfo=(user)=>{
        setUsuarioSeleccionado(user)
    }

    const cerrarVentanaInfo=()=>{
        setUsuarioSeleccionado(null)
    }

    const cargarDatos= async ()=>{
        if(!selectedFile){
            alert("Debe seleccionar un archivo JSON")
            return
        }

        const jsonData= await selectedFile.text()
        console.log(jsonData)
        const userArray=JSON.parse(jsonData)



        fetch(`http://localhost:5000/CargaMasiva`, {
            method: "POST", // metodo para enviar
            body: JSON.stringify(userArray),
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
        

    return (

        <div>
            <NavBarAdmin></NavBarAdmin>
        <div className="admin-background">
        <input type="file" onChange={handleFileChange} accept=".json"/>
    
        <button onClick={cargarDatos} className="btn btn-primary">Cargar Archivo JSON</button>
            <div className="centrar-tabla">
            <div className="table-container">
            <table className="table table-bordered text-center tablaUsers">
                <thead>
                    <tr>
                      <th >Codigo</th>
                        <th >Nombres</th>
                        <th >Apellidos</th>
                        <th >Genero</th>
                        <th >Facultad</th>
                        <th >Carrera</th>
                        <th>Correo</th>
                        <th >Acciones</th>
                    </tr>
                </thead>
                <tbody >
                    {listaUser.map((user) => (
                        <tr key={user.codigo}>
                            <td>{user.codigo}</td>
                            <td>{user.nombres}</td>
                            <td>{user.apellidos}</td>
                            <td>{user.genero}</td>
                            <td>{user.facultad}</td>
                            <td>{user.carrera}</td>
                            <td>{user.correo}</td>
                            <td>
                                <button className="btn btn-primary" onClick={()=>verInfo(user)}>Ver</button>
                                <button className="btn btn-danger"  onClick={()=>borrarUsuario(user.codigo)}>Eliminar</button>
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
                <p>codigo: {usuarioSeleccionado.codigo} </p>
                    <p>nombres: {usuarioSeleccionado.nombres} </p>
                    <p>apellidos: {usuarioSeleccionado.apellidos} </p>
                    <p>genero: {usuarioSeleccionado.genero} </p>
                    <p>Facultad: {usuarioSeleccionado.facultad} </p>
                    <p>Carrera: {usuarioSeleccionado.carrera} </p>
                    <p>Correo: {usuarioSeleccionado.correo} </p>
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
        </div>
    )

}

export default Administrador;

