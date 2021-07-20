import TorneosListItem from '../torneosListItem/torneoslistitem';
import { Link } from 'react-router-dom';



{/*Esto mapea los productos para utilizarlos luego en productListItem. Muy probable que tengamos que utilizar función random aqui en un futuro si eso. */}

const TorneosList = ({ torneos}) => {

 

   if (torneos.content?.length >0) {return (
        <>

        <h1 className="text-center mt-4">Nuestros Torneos</h1>
        {torneos.content.map((torneo) => <TorneosListItem key={`torneo-${torneo.id}`} torneo={torneo} />)}
        
                   <div className ="container-fluid text-center">
            

        
                   <div>
                   <Link to={`/torneos/${torneos.number-1}`} className> <button className = "btn btn-primary" disabled = {torneos.first}>Página Anterior</button> </Link>
                   <Link to={`/torneos/${torneos.number+1}`}> <button className = "btn btn-primary"   disabled = {torneos.last}>Siguiente Página</button> </Link>
                   
                    <p className = "mostrador">{(torneos.size*torneos.number)+1}-{(torneos.size*torneos.number)+(torneos.numberOfElements)} de {torneos.totalElements}</p>
                   
                   
                   </div>
                   
                   </div>
       
 
        </>
        
    );
   } else {
    return <>
    <div className ="container-fluid text-center busqueda">

    <div className="alert alert-danger" role="alert"> La búsqueda no ha obtenido ningún resultado. Intentelo de nuevo escribiendolo otra vez </div>
    </div>
    </>
   }
}

export default TorneosList;