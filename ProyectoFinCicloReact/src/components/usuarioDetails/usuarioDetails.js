import UsuarioPage from '../usuarioPage/usuarioPage';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


const UsuarioDetails = ({}) => {


    {/*Esto hace un fetch a la Api de Smash.GG, utilizando el slug del usuario en Smash.GG, se recibe por parámetro en la URL */ }
    const [usuario, setUsuario] = useState({});
    const { usuarioId } = useParams();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer ae25f11bef3f4023d3c9fb179e487329");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "__cfduid=d715a396714e72d18e590b1f29649271c1619357855");


    const graphql = JSON.stringify({
        query: "query userQuery($slug: String, $page: Int!, $perPage: Int!) {\r\n\r\n  user(slug: $slug){\r\n    player {\r\n      id\r\n      gamerTag\r\n    }\r\n    \r\n    images{\r\n      id\r\n      type\r\n      url\r\n    }\r\n    \r\n    authorizations{\r\n      type\r\n      externalUsername\r\n     \r\n    }\r\n    \r\n    bio\r\n \r\n    tournaments (query: { page: $page, perPage: $perPage }){\r\n      \r\n      nodes{\r\n        name\r\n        slug\r\n      }\r\n    }\r\n    \r\n    \r\n  }\r\n	\r\n}\r\n",
        variables: {"slug": usuarioId,"page":1,"perPage":5}
    
    })
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };



    useEffect(() => {

    
        fetch("https://api.smash.gg/gql/alpha", requestOptions)
            .then(response => response.json()).then(info => setUsuario(info.data.user));



    }, []);

    return <UsuarioPage usuario={usuario} />

}


export default UsuarioDetails;