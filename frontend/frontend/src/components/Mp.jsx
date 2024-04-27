import React, { useState, useEffect } from "react";
import './Styles/Styles.css'
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from "react-router-dom";
import NavBar from "./NavBar";



function Mp(){
 
    const [cookies, setCookies] = useCookies(['usuario'])
    const [datosUser, setDatosUser] = useState(cookies.usuario)
    const [listaObjetos, setListaObjetos] = useState([])


    useEffect(() => {

        fetch(`http://localhost:5000/getPublicaciones`, {
            method: "GET", // Utiliza get
            headers: {
                "Content-Type": "application/json", // Establece el tipo de contenido de la solicitud como Json
            },
        })
            .then((response) => response.json())
            .then((res) => {
                setListaObjetos(res.publicaciones)

            })
            .catch((error) => console.error(error))
    }, []);

    function viewIdPost(postId) {
        console.log("codigo del post:", postId);
    }

    return(
        <div>
            <NavBar></NavBar>
            <div className="home-background">
                <div className="card-container">
                    {listaObjetos.map(objeto => (
                        <div className="card" key={objeto.codigo}>
                            <div className="card-header">
                                <p>Usuario: {objeto.user}</p>
                                <p>Carrera: {objeto.karrera}</p>
                                <p>Categoria: {objeto.categoria}</p>
                                
                                <p>Fecha: {new Date(objeto.fechaHora).toLocaleString()}</p>
                            </div>
                            <div className="card-center-img">
                                {objeto.imagen && <img src={objeto.imagen} className="card-img" alt="..." />}
                            </div>
                            <p className="card-description">{objeto.descripcion}</p>
                            <button onClick={() => viewIdPost(objeto.codigo)}>Comentarios</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default Mp;