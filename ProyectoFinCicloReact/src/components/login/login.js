import { useState } from 'react';
import './login.css';


const Login = () => {

  const user = JSON.parse(sessionStorage.getItem('user'));
  const [mensaje, setMensaje] = useState(null);
  const formulariologin = {

    username: '',
    password: '',


  }



  const [formState, setFormState] = useState(formulariologin);

  const handleChange = event => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    })
  }



  const onSubmit = (event) => {

    event.preventDefault()
    fetch('http://localhost:8080/api/auth/signin', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(formState)
    }).then((response) => response.json()).then(data => {

      setMensaje(data.message);
      if (data.status !== 401) {
        sessionStorage.setItem("user", JSON.stringify(data));
        window.location = "/home";

      }

    }
    );




  }

  if (!user) {
    return (
        <>
    <div>
    <div className="container-fluid text-center mensajeAlertaLogin">
    {mensaje && (<span className="alert alert-primary "> {mensaje}</span>)}
    </div>
    <div class="container login-container">
      <div class="row justify-content-center">
        <div class="col-md-6 login-form-1">
          <h3>Login</h3>
          <form method="post"  onSubmit={onSubmit}>
            <div className="form-group col-md-12">
              <label>Nombre de Usuario</label>
              <input type="text" className="form-control" name="username" placeholder="Usuario" onChange={handleChange} minLength="3" maxLength="20" required />
            </div>

            <div className="form-group col-md-12">
              <label>Contraseña</label>
              <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} minLength="6" maxLength="40" required />
              
            </div>
               
              <button type="submit" className="btn btn-primary btnSubmit mt-5">Sign in</button>
            
          </form>
        </div>
      </div>
    </div>
    </div>
 
    </>

);
} 
else {
    return <>
        <div className="container-fluid text-center busqueda">
        {user && (<div className="alert alert-danger" role="alert"> Ya has hecho Login </div>)}
        </div>
        </>
    }
}




export default Login;