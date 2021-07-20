import React, { useEffect, useState } from 'react';
import TorneosList from '../torneoslist/torneoslist';

import {useParams} from 'react-router-dom';


const TorneosFetcher = () => {
    {/*Esto hace un fetch a la base de datos para recibir todos los torneos de forma paginada*/}

  const [torneos, setTorneos] = useState([]);
  const { page} = useParams();

  const myHeaders = new Headers();
  myHeaders.append("Access-Control-Allow-Origin", "*");

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,

    redirect: 'follow'
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/torneos/torneos/?page=' + page + '&size=5', requestOptions).then((response) => response.json()).then(data => setTorneos(data));
  }, [page]);

  return <TorneosList torneos={torneos} />;
};

export default TorneosFetcher;