import ProductListItem from '../productListItem/productListItem';
import { Link } from 'react-router-dom';
import './productList.css';


{/*Esto mapea los productos para utilizarlos luego en productListItem. Muy probable que tengamos que utilizar función random aqui en un futuro si eso. */}

const ProductList = ({ products}) => {

 

   if (products.content?.length >0) {return (
        <>
        <div className="container-fluid " > 
        <div className="row filaProductos "> 
        {products.content?.map((product) => <ProductListItem key={`product-${product.id}`} product={product} />)}
        </div>
        </div>
                   <div className ="container-fluid text-center">
            

        
                   <div>
                   <Link to={`/products/${products.number-1}`} className> <button className = "btn btn-primary" disabled = {products.first}>Página Anterior</button> </Link>
                   <Link to={`/products/${products.number+1}`}> <button className = "btn btn-primary"   disabled = {products.last}>Siguiente Página</button> </Link>
                   
                    <p className = "mostrador">{(products.size*products.number)+1}-{(products.size*products.number)+(products.numberOfElements)} de {products.totalElements}</p>
                   
                   
                   </div>
                   
                   </div>
       
 
        </>
        
    );
   } else {
    return <>
    <div className ="container-fluid text-center busqueda">

    <div className="alert alert-danger" role="alert"> La búsqueda no ha obtenido ningún resultado. Intentelo de nuevo escribiendolo otra vez </div>
    </div>
    </>
   }
}

export default ProductList;