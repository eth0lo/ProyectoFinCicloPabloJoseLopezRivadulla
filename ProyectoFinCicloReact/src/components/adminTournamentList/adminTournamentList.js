import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

{/*Esto mapea los productos para utilizarlos luego en productListItem. Muy probable que tengamos que utilizar función random aqui en un futuro si eso. */ }

const AdminTournamentList = ({ torneos}) => {

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


    //Método para eliminar torneos
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




        fetch('http://localhost:8080/api/torneos/torneo/'+ index, requestOptions)
        setTimeout(function(){window.location = "/adminTournament/0"} , 1200);  
        Swal.fire({
            title: "Torneo eliminado",
            text: `Torneo eliminado correctamente`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          })
      }
    }))

}
      
    

    if (torneos.content?.length > 0) {
        return (
            <>
                <div className = "container-fluid text-right">
                <NavLink to='/addTournament'><button className="btn btn-primary mt-4 mb-4 mr-4" role="button" >Añadir Torneo</button></NavLink>
                </div>
                <div className="card border-primary mb-3">
                    <div className="card-header">Torneos</div>
                    <div className="card-body text-primary">
                        <h5 className="card-title">Listado de Torneos</h5>

                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Id del Torneo</th>
                                    <th>Nombre del Torneo</th>
                                    <th>Url del Torneo</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>

                                
                                    {torneos.content.map((torneo) => (
                                    <tr >
                                        <td>{torneo.id}</td>
                                        <NavLink to = {`/torneo/${torneo.url}`}><td>{torneo.nombre}</td> </NavLink>
                                        <td>{torneo.url}</td>
                                        <NavLink to={`/editTournament/${torneo.id}`}><td><button className="btn btn-primary" role="button" >Editar</button></td></NavLink>
                                        <td><button className="btn btn-danger" role="button"  onClick={() => onDelete(torneo.id)} >Eliminar</button></td>
                                        </tr>))}
                              
                                


                            </tbody>
                        </table>
                    </div>
                </div>




                <div className="container-fluid text-center mt-4">



                    <div>
                        <Link to={`/adminTournament/${torneos.number - 1}`} className> <button className="btn btn-primary" disabled={torneos.first}>Página Anterior</button> </Link>
                        <Link to={`/adminTournament/${torneos.number + 1}`}> <button className="btn btn-primary" disabled={torneos.last}>Siguiente Página</button> </Link>

                        <p className="mostrador">{(torneos.size * torneos.number) + 1}-{(torneos.size * torneos.number) + (torneos.numberOfElements)} de {torneos.totalElements}</p>


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
            {admin &&(<NavLink to='/addTournament'><button className="btn btn-primary mt-4 mb-4 mr-4 text-center" role="button" >Añadir Torneo</button></NavLink>)}
            </div>
        </>
    }
}

export default AdminTournamentList;