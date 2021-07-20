import { useEffect, useState } from 'react';
import ProductList from '../productList';
import {useParams} from 'react-router-dom';

import './products.css';

const Products = () => {
  
  {/*Esta sentencia crea una variable producto que va a ser una array que iremos rellenando con los datos que obtenemos del fetch a la base de datos. Se lo pasamos a ProductList */}
  const [products, setProducts] = useState({});
  const { pageNumber} = useParams();
  
  useEffect(() => {
    
    fetch('http://localhost:8080/api/products/products/?page=' + pageNumber + '&size=5').then((response) => response.json()).then(data => setProducts(data));
  
    
  }, [pageNumber]);


  return <ProductList products={products} />;
};

export default Products;