import TournamentView from '../tournamentView/tournamentView';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const TournamentPage = () => {


    const { tournamentNombre } = useParams();



    {/*Esto hace un fetch a la Api de Smash.GG, no es uno de los torneos que recibimos de base de datos. Lo recibimos por parámetro en la URL */ }
    const [torneoSmash, setTorneoSmash] = useState({});

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer ae25f11bef3f4023d3c9fb179e487329");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "__cfduid=d715a396714e72d18e590b1f29649271c1619357855");


    const graphql = JSON.stringify({
        query: "query TournamentQuery($slug: String, $page: Int!, $perPage: Int!) {\r\n  tournament(slug: $slug) {\r\n    id\r\n \r\n    rules\r\n  startAt\r\n	images{\r\n      id\r\n      type\r\n      url\r\n    }\r\n    events {\r\n      name\r\n      entrants{\r\n        pageInfo{\r\n          total\r\n        }\r\n      }\r\n      standings(query: { page: $page, perPage: $perPage }) {\r\n        nodes {\r\n          placement\r\n          entrant {\r\n            name\r\n            participants{\r\n              user{\r\n                discriminator\r\n              }\r\n\r\n              }\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n}\r\n\r\n",
        variables: { "slug": tournamentNombre, "page": 1, "perPage": 8 }

    })
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };



    useEffect(() => {

    
        fetch("https://api.smash.gg/gql/alpha", requestOptions)
            .then(response => response.json()).then(info => setTorneoSmash(info.data.tournament));



    }, []);

    return <TournamentView torneoSmash={torneoSmash} tournamentNombre ={tournamentNombre}/>

}


export default TournamentPage;