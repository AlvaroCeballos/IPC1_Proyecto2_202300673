import React, {useState} from "react";
import { useCookies } from 'react-cookie';
import './Styles/Styles.css'
import { useNavigate } from "react-router-dom";

function Login() {
    const [codigo, setCarnet] = useState('');
    const [password, setPassword] = useState('');

    const [cookies, setCookies] = useCookies(['usuario'])

    const Navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (codigo === 'adminn' && password === '12345') {
            Navigate('/admin')
        }else{
            const dataJson = {
            codigo: codigo,
            password: password
            }

            fetch(`http://localhost:5000/login`, {
            method: "POST", // se hace solicitud tipo get
            body: JSON.stringify(dataJson), 
            headers: {
                "Content-Type": "application/json", 
            },
        })


        .then((response) => response.json())
            .then((res) => {

                if (res.encontrado===true) {
                    const dataUser=res.datos
                    console.log(dataUser)
               alert("Bienvenido "+dataUser.nombre+" "+dataUser.apellido)
               setCookies('usuario', dataUser)
               
                Navigate('/menup')
                }else{
                    alert("Usuario o password incorrectos")
                }
            })
            .catch((error) => console.error(error))


        }
 
    
    }
    return (
        <div className="login-background">
        <div className="container-fluid h-100">
            <div className="row align-items-center h-100">
                <div className="col-md-6 mx-auto">
        <div className="card">
            <div className="card-body">
            <h2 className="card-title text-center mb-4">Login para USocial</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-floating">

                    <input 
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="ingrese su codigo joven"
                    onChange={(e) => setCarnet(e.target.value)}
                    value={codigo}
                    />
                    <label htmlFor="floatingInput">codigo</label>
                </div>


                <div className="form-floating">

                    <input 
                    type="password"
                    className="form-control"
                    id="floatingInput"
                    placeholder="ingrese su codigo para poder hacer login dentro de la USOCIALUSAC"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    />
                    <label htmlFor="floatingInput">Password</label>
                </div>

                <div className="text-center">
                <button type="submit" className="btn btn-primary">Ingresar</button>

                </div>
            </form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default Login;
