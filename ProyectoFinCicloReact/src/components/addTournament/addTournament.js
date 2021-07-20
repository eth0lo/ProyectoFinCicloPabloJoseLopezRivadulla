import { useState } from 'react';
import { storage } from '../firebase/firebase';
import 'firebase/storage';
import React from 'react';
import Swal from 'sweetalert2';

const AddTournament = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));


    const [image, setImage] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [mensaje, setMensaje] = useState(null);

   // Constante captura las variables que vamos a enviar al back-end

    const formulario = {

        nombre: '',
        img: '',
        url: ''

    }

    let admin = null;

    //Método para saber si es un admin el usuario que ha logeado.
    if (user) {
  
      user.roles.forEach(roles => {
  
        if (roles === "ROLE_ADMIN") {
  
          admin = roles;
  
        }
  
      });
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

    // Método para coger la foto y previsualizarla.
    const handleChangeImage = event => {

        if (event.target.files[0]) {
            setImage(event.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(event.target.files[0]);
        }

    }

    //Método para subir la foto
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);

            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        formState.img = url;
                    })
            }
        )

    }
    // Método para guardar los datos en la BBDD
    function guardarBBDD() {

        let urlseparada = formState.url.split("/", 5)
        formState.url = urlseparada[4]

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

        fetch('http://localhost:8080/api/torneos/torneo', requestOptions)
            .then((response) => response.json()).then(data => setMensaje(data.message));

    }



    // Método que submitea el formulario en el back-end. Redirecciona a la página de administrar torneos.
    const onSubmit = (event) => {
        event.preventDefault()


        if (image != null) {
            handleUpload()
        }
        setTimeout(guardarBBDD, 3000)
        Swal.fire("Torneo creado", "Torneo agregado satisfactioramente. Se le redirigirá pronto a la página web de productos. Por favor espere", "success");
        setTimeout(function () { window.location = "/adminTournament/0" }, 4000);
    }

    // Hay que tener permiso de admin para poder entrar en esta página
    if (admin) {
        return (
            <>
        <div>
        <div>
          <h1 className="text-center tituloFormulario">Añadir Torneo</h1>
                </div>
            <form method="post" className="formulario" onSubmit={onSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Nombre del torneo</label>
                        <input type="text" className="form-control" name="nombre" placeholder="Nombre" onChange={handleChange} required />
                    </div>
                    <div className="form-group col-md-6">
                        <label>URL del torneo</label>
                        <input type="text" className="form-control" name="url" placeholder="Url" onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-row justify-content-center">

                    <label className="file">Imagen de torneo
                <input

                            name="img"
                            type="file"
                            accept="image/*"
                            onChange={handleChangeImage}

                        ></input>

                    </label>

                </div>


                <div className="text-center">
                    <img className="imagenUpload" src={imgData} />
                </div>

                <div className="container-fluid text-center">

                    <button type="submit" className="btn btn-primary mt-3">Añadir Torneo</button>
                </div>

                {mensaje && (<div className="alert alert-info mt-4" role="info"> {mensaje} </div>)}
            </form>

          

        </div>
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



export default AddTournament;