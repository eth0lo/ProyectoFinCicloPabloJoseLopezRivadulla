import { useState } from 'react';


const EditUser = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    const [errorEdad, setErrorEdad] = useState(null);
    const [mensaje, setMensaje] = useState(null);
    let formulario = {

        username: user.username,
        email: user.email,
        password: "placeholder",
        name: user.name,
        lastname: user.lastname,
        birthdate: user.birthdate
    }

    function logout () {
        window.location = '/login';
        window.sessionStorage.clear("user");

    }

    const [formState, setFormState] = useState(formulario);

    const handleChange = event => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        })
    }

    const onSubmit = (event) => {

        console.log(formState)
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

        fetch(`http://localhost:8080/api/users/${user.id}`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(formState)
        }).then((response) => response.json()).then(data => setMensaje(data.mensaje));
        setErrorEdad(null)
       setTimeout(logout, 2500) 
    }


    return (

        <div><h1 className="text-center mt-4">Editar Usuario: </h1>
        <form method="post" className="formulario" onSubmit={onSubmit}>


            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>Nombre de Usuario*</label>
                    <input type="text" className="form-control" value={user.username} minLength="3" maxLength="20" required />
                </div>
                <div className="form-group col-md-6">
                    <label >Nombre</label>
                    <input type="text" className="form-control" name="name" placeholder="Nombre" defaultValue={user.name} onChange={handleChange} required />
                </div>

                <div className="form-group col-md-6">
                    <label>Apellidos</label>
                    <input type="text" className="form-control" name="lastname" placeholder="Apellidos" defaultValue={user.lastname} onChange={handleChange} required />
                </div>


                <div className="form-group col-md-6">
                    <label >Email*</label>
                    <input type="email" className="form-control" value={user.email} required />

                </div>
            </div>


            <div className="form-row">



                <div className="form-group col-md-6">
                    <label> Date</label>
                    <input type="date" name="birthdate" className="form-control" defaultValue={user.birthdate} onChange={handleChange} required />
                    {errorEdad && <p> {errorEdad}</p>}
                </div>
            </div>
            <div className="container-fluid text-center">
                {mensaje && <div className="alert alert-info" role="alert">
                    {mensaje}
                </div>}
                <button type="submit" className="btn btn-primary mt-3">Editar Usuario</button>
            </div>
        </form>

        </div>

    );
}




export default EditUser;