import React, { useEffect, useState } from 'react';
import AdminProductList from '../adminProductList/adminProductList';
import { useParams } from 'react-router-dom';


const AdminProduct = () => {
    {/*Este componente nos carga todos los productos para poder administrarlos. Está protegido en el back-end con el Token. */ }


    const user = JSON.parse(sessionStorage.getItem('user'))


    const [products, setProduct] = useState([]);
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

        fetch('http://localhost:8080/api/products/admin/?page=' + page + '&size=5', requestOptions).then((response) => response.json()).then(data => setProduct(data));

    }, [page]);

    return <AdminProductList products={products}/>;
};

export default AdminProduct;