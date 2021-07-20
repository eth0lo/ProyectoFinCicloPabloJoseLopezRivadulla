import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';



const AdminTournamentList = ({ products}) => {

    const user = JSON.parse(sessionStorage.getItem('user'))

    let admin = null;
    //Método para saber si es un admin el usuario que ha logeado.
    if (user) {
  
      user.roles.forEach(roles => {
  
        if (roles === "ROLE_ADMIN") {
  
          admin = roles;
  
        }
  
      });
    }
    //Método para eliminar productos
    const onDelete = (index, indice) => {
        
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user.accessToken);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Headers", "*");
        myHeaders.append("Access-Control-Allow-Origin", "*");
    
        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'

        };

        Swal.fire({
            title: 'Esta seguro?',
            text: `¿Estas seguro de eliminar este producto?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!'
          }).then((result => {
            if (result.value) {


        fetch('http://localhost:8080/api/products/products/'+ index, requestOptions)
        setTimeout(function(){window.location = "/adminProduct/0"} , 1200);  
        Swal.fire({
            title: "Producto eliminado",
            text: `Producto eliminado correctamente`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          })
      }
    }))

}
    


    if (user && products.content?.length > 0) {
        return (
            <>
                <div className = "container-fluid text-right">
                <NavLink to='/addProduct'><button className="btn btn-primary mt-4 mb-4 mr-4" role="button" >Añadir Producto</button></NavLink>
                </div>
                <div className="card border-primary mb-3">
                    <div className="card-header">Productos</div>
                    <div className="card-body text-primary">
                        <h5 className="card-title">Listado de Productos</h5>

                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Id del Producto</th>
                                    <th>Nombre del Producto</th>
                                    <th>Precio del Producto</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>

                                
                                    {products.content.map((product, index) => (
                                    <tr >
                                        <td>{product.id}</td>
                                        <NavLink to={`/product/${product.id}`} ><td >{product.name}</td></NavLink>
                                        <td>{product.price}</td>
                                        <NavLink to={`/editProduct/${product.id}`}><td><button className="btn btn-primary" role="button" >Editar</button></td></NavLink>
                                        <td><button className="btn btn-danger" role="button" onClick={() => onDelete(product.id, index)} >Eliminar</button></td>
                                        </tr>))}
                              
                                


                            </tbody>
                        </table>
                    </div>
                </div>




                <div className="container-fluid text-center mt-4">



                    <div>
                        <Link to={`/adminProduct/${products.number - 1}`} className> <button className="btn btn-primary" disabled={products.first}>Página Anterior</button> </Link>
                        <Link to={`/adminProduct/${products.number + 1}`}> <button className="btn btn-primary" disabled={products.last}>Siguiente Página</button> </Link>

                        <p className="mostrador">{(products.size * products.number) + 1}-{(products.size * products.number) + (products.numberOfElements)} de {products.totalElements}</p>


                    </div>

                </div>


            </>

        );
    } else {
        return <>
            <div className="container-fluid text-center busqueda">

                {admin && (<div className="alert alert-danger" role="alert"> La búsqueda no ha obtenido ningún resultado. Intentelo de nuevo escribiendolo otra vez </div>)}
                {!admin && (<div className="alert alert-danger" role="alert"> Acceso Restringido </div>)}
            </div>

            <div className="container-fluid text-center">
            {admin && (<NavLink to='/addProduct'><button className="btn btn-primary mt-4 mb-4 mr-4 text-center" role="button" >Añadir Producto</button></NavLink>)}
            </div>
        </>
    }
}

export default AdminTournamentList;