import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown'

import "./Navbar.css";



const Navbar = ({ sumador }) => {

  const user = JSON.parse(sessionStorage.getItem('user'));
  const [buscador, setBuscador] = useState("");
  let admin = null;

  if (user) {

    user.roles.forEach(roles => {

      if (roles === "ROLE_ADMIN") {

        admin = roles;

      }

    });
  }

  const logout = () => {
    window.location = '/home';
    window.sessionStorage.clear("user");

  }

  return (
    <nav className="navbar navbar-expand-md  ">

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation"><FontAwesomeIcon className="carrito navitem" icon={faEllipsisV} /> </button>
      <span className="navbar-toggler-icon"></span>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

        <ul className="navbar-nav mx-auto navegador">
          <li className="nav-item p-2 navitem">
            <NavLink className="nav-link item" to='/home'>
              Home
          </NavLink>
          </li>
          <li className="nav-item p-2 navitem">
            <NavLink className="nav-link item" to='/products/0'>
              Productos
          </NavLink>
          </li>


          <li className="nav-item p-2 navitem">
            <NavLink className="nav-link item" to='/torneos/0'>
              Torneos
          </NavLink>
          </li>


          <li>



            <form className="d-flex mb-3">
              <input className="form-control me-2 buscador" type="search" placeholder="Buscar Torneos..." aria-label="Search" onChange={(event) => setBuscador(event.target.value)} />
              <NavLink to={`/search/${buscador}`}><button className="btn btn-outline-secondary ml-2 buscador" type="submit">Buscar</button></NavLink>
            </form>


          </li>

          {!user && (<li className="nav-item p-2 ml-2 navitem">
            <NavLink to='/register'> <a className="nav-link item">Registrarse</a> </NavLink>
          </li>)}

          {user && !admin && (<li className="ml-4"><a><Dropdown>
            <Dropdown.Toggle  id="dropdown-basic" className ="dropdowncolor" variant="secondary">
              {user.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item href ="/editUser">Editar Perfil</Dropdown.Item>
            <Dropdown.Item onClick = {logout}>Cerrar Sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown></a></li>)}

          {user && (<li className="nav-item p-2 navitem">


            
          </li>)}

          {admin && (<li li className="ml-4"> <Dropdown>
            <Dropdown.Toggle  id="dropdown-basic" className ="dropdowncolor" variant="secondary">
              Admin
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href = "/addUser">Registrar nuevo Usuario</Dropdown.Item>
              <Dropdown.Item href ="/adminTournament/0">Ver Torneos</Dropdown.Item>
              <Dropdown.Item href ="/adminProduct/0">Ver Productos</Dropdown.Item>
              <Dropdown.Item href ="/adminUser/0">Ver Usuarios</Dropdown.Item>
             <Dropdown.Item onClick = {logout}>Cerrar Sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown></li>)}

          {user && !admin && (<NavLink to='/carrito'> <li className="pruebaNav"><FontAwesomeIcon className="carrito navitem" icon={faShoppingCart} /> <p>{sumador}</p></li>
          </NavLink>
          )}



          {!user && (<li className="nav-item p-2 navitem">
            <NavLink to='/login'> <a className="nav-link item">Login</a> </NavLink>
          </li>)}


        </ul>
      </div>
    </nav>
  );


};


export default Navbar;