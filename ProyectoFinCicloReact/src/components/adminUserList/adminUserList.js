import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

{/*Esto mapea los productos para utilizarlos luego en productListItem. Muy probable que tengamos que utilizar función random aqui en un futuro si eso. */ }

const AdminTournamentList = ({ usuarios }) => {

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
    //Método para eliminar usuarios
    const onDelete = (index) => {

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user?.accessToken);
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


        fetch('http://localhost:8080/api/users/users/' + index, requestOptions)
        setTimeout(function () { window.location = "/adminUser/0" }, 1200);
        Swal.fire({
            title: "Usuario eliminado",
            text: `Usuario eliminado correctamente`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          })
      }
    }))

}


    if (usuarios.content?.length > 0) {
        return (
            <>
                <div className="container-fluid text-right">
                    <NavLink to='/addUser'><button className="btn btn-primary mt-4 mb-4 mr-4" role="button" >Añadir Usuario</button></NavLink>
                </div>
                <div className="card border-primary mb-3">
                    <div className="card-header">Usuarios</div>
                    <div className="card-body text-primary">
                        <h5 className="card-title">Listado de Torneos</h5>

                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Id del Usuario</th>
                                    <th>Apodo del Usuario</th>
                                    <th>Nombre del Usuario</th>
                                    <th>Apellido del Usuario</th>
                                    <th>Email del Usuario</th>
                                    <th>Roles del Usuario</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>


                                {usuarios.content.map((usuario) => (
                                    <tr >
                                        <td>{usuario.id}</td>
                                        <td>{usuario.username}</td>
                                        <td>{usuario.name}</td>
                                        <td>{usuario.lastname}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.roles.map((role) => <p>{role.name}</p>)}</td>
                                        {usuario.id != user.id && (<td><button className="btn btn-danger" role="button" onClick={() => onDelete(usuario.id)} >Eliminar</button></td>)}
                                        {usuario.id == user.id && (<td><p >No se puede eliminar el usuario</p></td>)}
                                    </tr>))}




                            </tbody>
                        </table>
                    </div>
                </div>




                <div className="container-fluid text-center mt-4">



                    <div>
                        <Link to={`/adminUser/${usuarios.number - 1}`} className> <button className="btn btn-primary" disabled={usuarios.first}>Página Anterior</button> </Link>
                        <Link to={`/adminUser/${usuarios.number + 1}`}> <button className="btn btn-primary" disabled={usuarios.last}>Siguiente Página</button> </Link>

                        <p className="mostrador">{(usuarios.size * usuarios.number) + 1}-{(usuarios.size * usuarios.number) + (usuarios.numberOfElements)} de {usuarios.totalElements}</p>


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

        </>
    }
}

export default AdminTournamentList;