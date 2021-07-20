import React, { useEffect, useState } from 'react';
import AdminTournamentList from '../adminTournamentList/adminTournamentList';
import { useParams } from 'react-router-dom';


const AdminTournament = () => {
     {/*Este componente nos carga todos los torneos para poder administrarlos. Está protegido en el back-end con el Token. */ }


    const user = JSON.parse(sessionStorage.getItem('user'))


    const [torneos, setTorneos] = useState([]);
    const { page } = useParams();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user.accessToken);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Headers", "*");


    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };


    useEffect(() => {

        fetch('http://localhost:8080/api/torneos/admin/?page=' + page + '&size=5', requestOptions).then((response) => response.json()).then(data => setTorneos(data));

    }, [page]);

    return <AdminTournamentList torneos={torneos} setTorneos={setTorneos} />;
};

export default AdminTournament;