import { Link } from 'react-router-dom';
import "./carruselImg.css";


const CarruselImg = ({ product, className }) =>





    <div key={product.id} className={className}>

        <Link to={`/product/${product.id}`}> <img src={product.img} className="imagen" alt={product.name} />


            <a className="piefoto"><br/>{product.name}</a> </Link>



    </div>



export default CarruselImg;