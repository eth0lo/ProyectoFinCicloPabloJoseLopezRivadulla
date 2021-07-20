import { Link } from 'react-router-dom';

import "./productPage.css";

const user = JSON.parse(sessionStorage.getItem('user'));

let admin = null;

if (user) {

    user.roles.forEach(roles => {

        if (roles === "ROLE_ADMIN") {

            admin = roles;

        }

    });
}

const ProductPage = ({ product, addProduct }) => {



    const handleClick = () => {


        addProduct(product)


    }


    return (

        <div className="container colocadorproducto">


            <div className="row">
                <div className="col-md-4"><img src={product.img} alt={product.img} className="catalogo" /></div>

                <div className="col-md-4">


                    <h2 className="titulo text-center">{product.name}</h2>




                    <p className="price text-center">Precio: {product.price} Euros</p>



                    <p className="text-center">
                        <a className="btn btn-secondary descripcionProducto" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Descripción
                        </a>
                    </p>

                    <div className="collapse" id="collapseExample">
                        <div className="card card-body collapsebody">
                            {product.description}
                        </div>
                    </div>

                    <p className="text-center mt-4">

                        {user && !admin && <button type="button" className="btn btn-primary" onClick={handleClick}>Añadir al carrito</button>}
                        {!user && <Link to="/login"><button type="button" className="btn btn-primary" >Iniciar sesión</button></Link>}
                    </p>
                </div>
            </div>




        </div>


    )
}

export default ProductPage;