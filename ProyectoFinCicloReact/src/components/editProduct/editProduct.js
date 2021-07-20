import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditProductView from  '../editProductView/editProductView';


const EditProduct = ({}) => {
  const [product, setProduct] = useState(null);
  const { idProduct } = useParams();



  useEffect(() => {

   
    
    fetch(`http://localhost:8080/api/products/product/${idProduct}`).then((response) => response.json()).then(data => setProduct(data));
      
    
  }, [idProduct]);

  return product && Object.keys(product).length !== 0 ? <><EditProductView product={product} /></> : <p>No hay un producto con ese nombre.</p>;
};


export default EditProduct;  