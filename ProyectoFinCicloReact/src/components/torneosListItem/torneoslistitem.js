import { Link} from 'react-router-dom';
import "./torneoListItem.css";






const TorneoListItem = ({ torneo}) => {




return (
<div >
{/*Esto construye lo necesario para poner los torneos con dos columnas en la página torneos */}
    <div className="container"> 
    
    <div className="row backgroundFila" key = {torneo.id}> 
        
        <div className ="col-md-3"> <Link to={`/torneo/${torneo.url}`}> <img src = {torneo.img} alt = {torneo.name} className="foto"></img> </Link> </div>

        <div className ="col-md-9"> 

        <h1 className="nombreTorneo"><Link to={`/torneo/${torneo.url}`}> <a >{torneo.nombre}</a> </Link></h1>
        {torneo.comentario.length == 1 && (<p className="comentariosTorneos">1 comentario</p>)}
        
        {torneo.comentario.length > 1 &&  (<p className="comentariosTorneos">{torneo.comentario.length} comentarios</p>)}
        
        {torneo.comentario.length == 0 && (<p className="comentariosTorneos"> 0 comentarios</p>)}
        

        </div>

        
        
       
    </div>
    </div>
 
    </div>
    

    );}



    


export default  TorneoListItem;