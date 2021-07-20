import { Link} from 'react-router-dom';
import "./productListItem.css";






const ProductListItem = ({ product}) => {




return (
<div >
{/*Esto construye lo necesario para poner los productos con dos columnas en la página productos */}

    
    <div className="col-md-4 separadorcatalogo" key = {product.id}> 
        
        <div > <Link to={`/product/${product.id}`}> <img src = {product.img} alt = {product.name} className="catalogo"></img> </Link> </div>
        <div> 
        
        <p className="nombretitulo"><Link to={`/product/${product.id}`}> <a className="linkproducto">{product.name}</a> </Link></p>
        
        </div>

        
        
       
    </div>
    </div>
 
    

    );}



    


export default  ProductListItem;