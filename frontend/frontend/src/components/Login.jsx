import React, {useState} from "react";



function Login() {
    const [carnet, setCarnet] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(carnet);
        console.log(password);
    }
    return (
        <div className="card">
            <div className="card-body">
            <h2 className="card-title text-center mb-4">Login para USocial</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-floating">

                    <input 
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="ingrese su carnet joven"
                    onChange={(e) => setCarnet(e.target.value)}
                    value={carnet}
                    />
                    <label htmlFor="floatingInput">Carnet</label>
                </div>


                <div className="form-floating">

                    <input 
                    type="password"
                    className="form-control"
                    id="floatingInput"
                    placeholder="ingrese su carnet para poder hacer login dentro de la USOCIALUSAC"
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
    )
}

export default Login;