import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './productDetails.css';
import ProductPage from  '../productPage/productPage';


const ProductDetails = ({carrito,addProduct}) => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();


  useEffect(() => {
    fetch(`http://localhost:8080/api/products/product/${productId}`).then((response) => response.json()).then(data => setProduct(data));
  }, [productId]);

  return product && Object.keys(product).length !== 0 ? <><ProductPage product={product} carrito = {carrito} addProduct = {addProduct}/></> : <p>No hay un producto con el ID: {productId}.</p>;
};


export default ProductDetails;  