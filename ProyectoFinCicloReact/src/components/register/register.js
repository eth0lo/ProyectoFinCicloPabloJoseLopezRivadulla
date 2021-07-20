import { useState} from 'react';
import Swal from 'sweetalert2';
import './register.css';






const Register = () => {


  const [errorEdad, setErrorEdad] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const formulario = {

    username: '',
    email: '',
    password: '',
    name: '',
    lastname: '',
    birthdate: ''


  }

  const [formState, setFormState] = useState(formulario);

  const handleChange = event => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    })
  }





  const onSubmit = (event) => {
    event.preventDefault()


    const d = new Date();
    const c = new Date(formState.birthdate);

    const a = c.getFullYear();
    const n = d.getFullYear();

    const edad = n - a;
    if (edad < 18) {
      setErrorEdad("Tienes que ser mayor de 18")
      setMensaje(null)
      return;
    }

 
    fetch('http://localhost:8080/api/auth/signup', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(formState)
    }).then((response) => response.json()).then(data =>  { 

      if (data.message){

          Swal.fire("Registrado Exitosamente", `${data.message}. Se le redireccionará al Login`, "success")
          setErrorEdad(null)
          setTimeout(function(){window.location = "/login"} , 2000);  
      } else {

          Swal.fire("Error", `${data.error}`, "error")
      }
  }
      
)}


  return (
    <div>
    <h1 className="text-center tituloFormulario">Formulario de Registro </h1>
    <form method="post" className="formulario" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>Nombre de Usuario</label>
          <input type="text" className="form-control" name="username" placeholder="Usuario" onChange={handleChange} minLength="3" maxLength="20" required />
        </div>
        <div className="form-group col-md-6">
          <label>Contraseña</label>
          <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} minLength="6" maxLength="40" required/>
        </div>
      </div>
      <div className="form-row">

        <div className="form-group col-md-6">
          <label >Nombre</label>
          <input type="text" className="form-control" name="name" placeholder="Nombre" onChange={handleChange} required />
        </div>

        <div className="form-group col-md-6">
          <label>Apellidos</label>
          <input type="text" className="form-control" name="lastname" placeholder="Apellidos" onChange={handleChange} required />
        </div>

      </div>


      <div className="form-row">
        <div className="form-group col-md-6">
          <label >Email</label>
          <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} required />

        </div>

        <div className="form-group col-md-2">
          <label> Fecha</label>
          <input type="date" name="birthdate" className="form-control" onChange={handleChange} required />
          {errorEdad && <div className="alert alert-danger" role="alert"> {errorEdad}</div>}
        </div>
      </div>
      <div className="container-fluid text-center">

        <button type="submit" className="btn btn-primary mt-3">Registrarse</button>
      </div>
    </form>
    </div>


  );
}



export default Register;