import { useEffect, useState } from 'react';
import TorneosList from '../torneoslist/torneoslist';
import {useParams} from 'react-router-dom';

import './search.css';

const Search = () => {
  
  {/*Esta sentencia crea una variable producto que va a ser una array que iremos rellenando con los datos que obtenemos del fetch a la base de datos. Se lo pasamos a ProductList */}
  const [torneos, setTorneos] = useState({});
  const { buscador } = useParams();
  
  useEffect(() => {
    
    fetch('http://localhost:8080/api/torneos/query/' + buscador +'/?page=0&size=5' ).then((response) => response.json()).then(data => setTorneos(data));
  
    
  }, [buscador]);



  return <TorneosList torneos={torneos} />;
};

export default Search;