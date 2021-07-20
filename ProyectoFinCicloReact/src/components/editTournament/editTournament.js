import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditTournamentView from  '../editTournamentView/editTournamentView';


const EditTournament = ({}) => {
  const [torneo, setTorneo] = useState(null);
  const { idTournament } = useParams();



  useEffect(() => {

   
    
    fetch(`http://localhost:8080/api/torneos/torneos/${idTournament}`).then((response) => response.json()).then(data => setTorneo(data));
      
    
  }, [idTournament]);

  return torneo && Object.keys(torneo).length !== 0 ? <><EditTournamentView torneo={torneo} /></> : <p>No hay un torneo con ese id.</p>;
};


export default EditTournament;  