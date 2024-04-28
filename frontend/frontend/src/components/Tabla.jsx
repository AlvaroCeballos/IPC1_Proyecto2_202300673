import React, { useState, useEffect } from "react";
import './Styles/Styles.css'
import { useCookies } from 'react-cookie';
import { Modal } from "react-bootstrap";
import NavBarAdmin from "./NavBarAdmin";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";


function Tabla(){
    const [cookies, setCookies] = useCookies(['usuario'])
    const [user, setUser] = useState(cookies.usuario)
    const [listaPubli, setlistaPubli] = useState([])
    const [publicacionSeleccionado, setpublicacionSeleccionado] = useState(null)
    const [actualizarTabla, setActualizarTabla] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [cookiesp, setCookiesp] = useCookies(['publicacion'])
    const [userp, setUserp] = useState(cookiesp.publicacion)

    const exportarCSV=()=>{
        const titulos=["codigo","descripcion","categoria","anonimo"]
        const csv=listaPubli.map((userp)=>`${userp.codigo},${userp.descripcion},${userp.categoria},${userp.anonimo}`).join("\n")
        const link=document.createElement("a")
        link.href=URL.createObjectURL(new Blob([titulos, "\n", csv],{type:"text/csv"}))
        link.download="Publicaciones.csv"
        link.click()
    }

    useEffect(() => {
        fetch(`http://localhost:5000/getPublicaciones`, {
            method: "GET", // se hace solicitud tipo get
          
            headers: {
                "Content-Type": "application/json",
            },
        })


            .then((response) => response.json())
            .then((res) => {

                setlistaPubli(res.publicaciones)
                console.log(listaPubli)
                

               
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

    const verInfo=(userp)=>{
        setpublicacionSeleccionado(userp)
    }

    const cerrarVentanaInfo=()=>{
        setpublicacionSeleccionado(null)
    }

    const cargarDatos= async ()=>{
        if(!selectedFile){
            alert("Debe seleccionar un archivo JSON")
            return
        }

        const jsonData= await selectedFile.text()
        console.log(jsonData)
        const publiArray=JSON.parse(jsonData)



        fetch(`http://localhost:5000/CargaMasivaPubli`, {
            method: "POST", // metodo para enviar
            body: JSON.stringify(publiArray),
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
            <div 
            style={{
                display: "flex",
                justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontWeight: "bold",
                
                }}>
        <h1>Funciones Publicaciones</h1>
        </div>
        <div 
            style={{
                display: "flex",
                justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontWeight: "bold",
                
                }}>
                    <button className="btn btn-dark" onClick={exportarCSV}>Exportar CSV</button>
                </div>
        <input type="file" onChange={handleFileChange} accept=".json"/>
        
    
        <button onClick={cargarDatos} className="btn btn-primary">Cargar Archivo JSON</button>
            <div className="centrar-tabla">
            <div className="table-container">
            <table className="table table-bordered text-center tablaUsers">
                <thead>
                    <tr>
                      <th >Codigo</th>
                        <th >Descripcion</th>
                        <th >Categoria</th>
                        <th >Anonimo</th>
                        <th >Acciones</th>
                    </tr>
                </thead>
                <tbody >
                    {listaPubli.map((userp) => (
                        <tr key={userp.codigo}>
                            <td>{userp.codigo}</td>
                            <td>{userp.descripcion}</td>
                            <td>{userp.categoria}</td>
                            <td>{userp.anonimo}</td>
                            
                            <td>
                                <button className="btn btn-primary" onClick={()=>verInfo(userp)}>Ver</button>
                                <button className="btn btn-danger"  onClick={()=>borrarUsuario(userp.codigo)}>Eliminar</button>
                            </td>
                        </tr>
                        
                    ))}
                    
                </tbody>
            </table>
               {// se ejecuta mostrando los datos solo si es distinto de null
}
            {publicacionSeleccionado &&(
                <Modal show={true} onHide={cerrarVentanaInfo}>

                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>codigo: {publicacionSeleccionado.codigo} </p>
                    <p>descripcion: {publicacionSeleccionado.descripcion} </p>
                    <p>categoria: {publicacionSeleccionado.categoria} </p>
                    <p>anonimo: {publicacionSeleccionado.anonimo} </p>
                    
                </Modal.Body>

                <Modal.Footer>
                    <button variant="secondary" onClick={cerrarVentanaInfo}>
                        Cerrar
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

export default Tabla;