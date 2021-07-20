import React, { useEffect, useState } from 'react';
import AdminUserList from '../adminUserList/adminUserList';
import { useParams } from 'react-router-dom';


const AdminUser = () => {
     {/*Este componente nos carga todos los usuarios para poder administrarlos. Está protegido en el back-end con el Token. */ }

    const user = JSON.parse(sessionStorage.getItem('user'))


    const [usuarios, setUsuarios] = useState([]);
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

        fetch('http://localhost:8080/api/users/users/?page=' + page + '&size=5', requestOptions).then((response) => response.json()).then(data => setUsuarios(data));

    }, [page]);

    return <AdminUserList usuarios={usuarios} setUsuarios={setUsuarios} />;
};

export default AdminUser;