import React, { useEffect, useState } from 'react';
import CarruselList from '../carruselList/carruselList';


const Products = () => {
    {/*Esta sentencia crea una variable producto que va a ser una array que iremos rellenando con los datos que obtenemos del fetch a la base de datos. Se lo pasamos a CarruselList */}

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/products/carrusel/?page=0&size=10').then((response) => response.json()).then(data => setProducts(data.content));
  }, []);

  return <CarruselList products={products} />;
};

export default Products;