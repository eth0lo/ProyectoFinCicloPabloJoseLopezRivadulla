import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './shopcart.css';


const ShopCart= ({carrito, onDelete}) => {
    
    const [precioTotal,setPrecioTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        carrito.map((cestaprueba) => total += cestaprueba.price)
        setPrecioTotal(total)
    }, [carrito])

return (
  <div>

{carrito.map((cestaprueba, index) => {
  
    return (
        <div className="container"> 
        <div className = "row mt-4" key = {cestaprueba.id}>

        <div className="col-md-4"> <img src= {cestaprueba.img} alt = {cestaprueba.name} className="catalogo "></img></div>
        
        <div className="col-md-4"> <p className="nombreProducto">{cestaprueba.name}</p>
        <p className ="plataforma">{cestaprueba.description}</p>
        <button className= "btn btn-secondary mt-4" onClick={() => onDelete(index)}>Borrar</button>
        
        
        </div>
        
        <div className="col-md-4"> <p className ="precio2">{cestaprueba.price} Euros</p></div>
         
        
        </div>
        </div>
    )
})}

{precioTotal >0 ? <p className="text-center total"> Total a pagar: {precioTotal} Euros</p> : 

<div className="container textocarrito text-center border"> Tu carrito está vacío. Puedes continuar <Link to ="/products/0"><a>comprando aquí</a></Link></div> }


</div>
)

}
export default ShopCart;