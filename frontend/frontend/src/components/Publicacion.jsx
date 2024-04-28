import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import './Styles/Styles.css';
import NavBar from './NavBar';
import NavBarAdmin from "./NavBarAdmin";
import { Dropdown } from "react-bootstrap";

import { Form } from 'react-bootstrap';

function Publicacion() {
    const [cookies] = useCookies(['usuario']);
    const [datosUser, setDatosUser] = useState(cookies.usuario)
    const [cookiesp, setCookiesp] = useCookies(['publicacion'])
    const [descripcion, setDescripcion] = useState('');
   
    const [categoria, setCategoria] = useState('');
    const [anonimo, setAnonimo] = useState(false);

    const [imagen, setImagen] = useState('');
    const [imagenURL, setImagenURL] = useState('');

    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };

    const handleAnonimoChange = (event) => {
        setAnonimo(event.target.value);
    };

    const handleCheckChange = (event) => {
        setAnonimo(event.target.checked);
        console.log(anonimo)
        console.log(event.target.checked)
    };

    const handleCategoriaChange = (event) => {
        setCategoria(event.target.value);
    };

    

    const handleImagenChange = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onloadend = () => {
            setImagen(reader.result);
            setImagenURL(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();


        

            const dataJson = {
                codigo: datosUser.codigo,
                descripcion: descripcion,
                imagen: imagen,
                categoria: categoria
            }
           



            fetch(`http://localhost:5000/createPost`, {
            method: "POST",
            body: JSON.stringify(dataJson),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {


                const dataPubli=res.datos
                console.log(dataPubli)
       
                



                console.log(res)
                alert(res.mensaje)
                setImagenURL('');

                setCookiesp('publicacion', dataPubli)
            })
            .catch((error) => console.error(error))
        

        















        

 
      

    };
  return (
    <div>
      
      <NavBar></NavBar>
      <div className="home-background">
    <div className="center-post-form">
        <div className="post-form">
            <h2>Crear Publicación</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea
                        id="descripcion"
                        value={descripcion}
                        onChange={handleDescripcionChange}
                        rows="4"
                        required
                    ></textarea>
                </div>

                
                <div className="form-group">
                    <label htmlFor="descripcion">Categoria:</label>

    <select 
    value={categoria} 
    onChange={handleCategoriaChange}
    required
    >
    <option value="select">Seleccionar categoria</option>
    <option value="Anuncio Importante">Anuncio Importante</option>
    <option value="Divertido">Divertido</option>
    <option value="Académico">Académico</option>
    <option value="Variedad">Variedad</option>
</select>


                    
                </div>

                <Form>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Anónimo"
                        checked={anonimo}
                        onChange={handleCheckChange}
                    />
                </Form>

                <div className="form-group">
                    <label htmlFor="imagen">Imagen:</label>

                    <input
                        type="file"
                        id="imagen"
                        accept="image/*"
                        onChange={handleImagenChange}

                    />
                </div>

                <div className="form-group">
                    {imagenURL && <img src={imagenURL} alt="Preview" style={{ maxWidth: '150px' }} />}
                </div>

                <button type="submit" className="btn btn-outline-success">Publicar</button>
            </form>
        </div>
    </div>
</div>
</div>
  );    
}

export default Publicacion;

