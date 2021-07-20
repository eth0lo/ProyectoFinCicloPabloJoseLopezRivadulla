import { useState } from 'react';
import { storage } from '../firebase/firebase';
import 'firebase/storage';

import React from 'react';


const EditProductView = (product) => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    let admin = null;
    //Método para saber si es un admin el usuario que ha logeado.
    if (user) {
  
      user.roles.forEach(roles => {
  
        if (roles === "ROLE_ADMIN") {
  
          admin = roles;
  
        }
  
      });
    }

    const [image, setImage] = useState(null);
    const [imgData, setImgData] = useState(null);

    const [mensaje, setMensaje] = useState(null);
     // Constante captura las variables que vamos a enviar al back-end
    const formulario = {

        name: product.product.name,
        description: product.product.description,
        price: product.product.price,
        img: product.product.img,

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

    
    //Método para subir la foto a Firebase
    function handleUpload() {
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
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user.accessToken);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Headers", "*");


        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(formState),
            redirect: 'follow'
          };

        fetch('http://localhost:8080/api/products/products/' + product.product.id , requestOptions) 
        .then((response) => response.json()).then(data => setMensaje(data.message));

    }
    
    // Método que submitea el formulario en el back-end. Redirecciona a la página de administrar productos.
    const onSubmit = (event) => {
        event.preventDefault()

        if (image != null) {
            handleUpload()
        } 

        setMensaje("Producto agregado satisfactioramente. Se le redirigirá pronto a la página web de productos. Por favor espere")
        setTimeout(guardarBBDD, 3000)
        setTimeout(function(){window.location = "/adminProduct/0"} , 4000);  
    }

    if (admin) {
        return (
            <>
            <h1 className="text-center tituloFormulario">Editar Producto: {product.product.name}</h1>
        <form method="post" className="formulario" onSubmit={onSubmit}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>Nombre de Producto</label>
                    <input type="text" className="form-control" name="name" defaultValue = {product.product.name} onChange={handleChange} required />
                </div>
                <div className="form-group col-md-6">
                    <label>Descripcion</label>
                    <input type="text" className="form-control" name="description" defaultValue ={product.product.description} onChange={handleChange} required />
                </div>
            </div>
            <div className="form-row">

                <div className="form-group col-md-6">
                    <label >Precio</label>
                    <input type="number" className="form-control" name="price" defaultValue = {product.product.price} onChange={handleChange} required />
                </div>

                <label className="file">Imagen de producto
                <input 
                        name="img"
                        type="file"
                        onChange={handleChangeImage}

                    ></input>

                </label>

            </div>

            <div className="text-center">
                    <img className="imagenUpload" src={imgData} />
                </div>


            <div className="container-fluid text-center">

                <button type="submit" className="btn btn-primary mt-3">Editar Producto</button>
            </div>

           {mensaje && (<div className="alert alert-info mt-4 text-center" role="alert"> {mensaje} </div>)} 
          
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




export default EditProductView;