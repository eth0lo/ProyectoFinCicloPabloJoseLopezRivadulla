import { useState } from 'react';
import Swal from 'sweetalert2';






const AddUser = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    const [errorEdad, setErrorEdad] = useState(null);
    const [mensaje, setMensaje] = useState(null);
    
    
   // Constante captura las variables que vamos a enviar al back-end
    const formulario = {

        username: '',
        email: '',
        password: '',
        name: '',
        lastname: '',
        birthdate: '',
        role: ["user", "admin"]


    }

    //Constante que vamos a enviar al back-end
    const [formState, setFormState] = useState(formulario);

    // Método para asignar las variables a los campos del registro
    const handleChange = event => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        })
    }

    let admin = null;

    //Metodo para saber si es un admin el usuario que ha logeado.
    if (user) {

        user.roles.forEach(roles => {

            if (roles === "ROLE_ADMIN") {

                admin = roles;

            }

        });
    }

    // Método que submitea el formulario en el back-end. Redirecciona a la página de administrar usuarios.
    const onSubmit = (event) => {
        event.preventDefault()
        formState.role = ["user", formState.role]

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


        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user.accessToken);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Headers", "*");


        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(formState),
            redirect: 'follow'
        };

        fetch('http://localhost:8080/api/auth/signupAdmin', requestOptions)

            .then((response) => response.json()).then(data => {

                if (data.message) {

                    Swal.fire("Usuario creado", `${data.message}`, "success")
                    setErrorEdad(null)
                    setTimeout(function () { window.location = "/adminUser/0" }, 2000);
                } else {

                    Swal.fire("Error", `${data.error}`, "error")
                }
            }

            )
    }

    
    // Hay que tener permiso de admin para poder entrar en esta página
    if (admin) {
        return (
            <>
                <div>
                    <h1 className="text-center tituloFormulario">Formulario de Registro: Administrador</h1>
                </div>
                <form method="post" className="formulario" onSubmit={onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Nombre de Usuario</label>
                            <input type="text" className="form-control" name="username" placeholder="Usuario" onChange={handleChange} minLength="3" maxLength="20" required />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Contraseña</label>
                            <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} minLength="6" maxLength="40" />
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
                            <label> Date</label>
                            <input type="date" name="birthdate" className="form-control" onChange={handleChange} required />
                            {errorEdad && <div className="alert alert-danger" role="alert"> {errorEdad}</div>}
                        </div>

                        <div class="form-group">
                            <label for="Rol">Rol</label>
                            <select className="form-control" id="exampleFormControlSelect1" name="role" onChange={handleChange} required>
                                <option value=""> ---Seleccione un rol--- </option>
                                <option>admin</option>
                                <option>mod</option>

                            </select>
                        </div>
                    </div>
                    <div className="container-fluid text-center">
                        {mensaje && <div className="alert alert-info" role="alert">
                            {mensaje}
                        </div>}
                        <button type="submit" className="btn btn-primary mt-3">Registrarse</button>
                    </div>
                </form>

            </>

        );
    }
    else {
        return <>
            <div className="container-fluid text-center busqueda">
                {!admin && (<div className="alert alert-danger" role="alert"> Acceso Restringido </div>)}
            </div>
        </>
    }
}

export default AddUser;