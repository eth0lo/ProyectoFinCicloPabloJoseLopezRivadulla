import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './torneoDetails.css';
import TorneoPage from  '../torneoPage/torneoPage';

//Esta clase hace Fetch a la base de datos para coger un Torneo de los nuestros
const TorneoDetails = ({}) => {
  const [torneo, setTorneo] = useState(null);
  const { torneoNombre } = useParams();



  useEffect(() => {

   
    
    fetch(`http://localhost:8080/api/torneos/torneo/${torneoNombre}`).then((response) => response.json()).then(data => setTorneo(data));
      
    
  }, [torneoNombre]);

  return torneo && Object.keys(torneo).length !== 0 ? <><TorneoPage torneo={torneo} /></> : 
  <div className="container-fluid text-center busqueda">
  <div className="alert alert-info" role="alert">No hay un torneo con el nombre: {torneoNombre}.</div>
  </div>
  ;
};


export default TorneoDetails;  