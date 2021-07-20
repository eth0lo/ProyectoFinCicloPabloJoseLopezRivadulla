import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,

} from "react-router-dom";
import './App.css';

import Footer from './components/footer/footer';
import Navbar from './components/Navbar/Navbar';
import Home from './components/home/home';
import Producto from './components/products/products';
import ProductDetails from './components/productDetails/productDetails';
import Search from './components/search/search';
import Register from './components/register/register';
import AddProduct from './components/addProduct/addProduct';
import AddTournament from './components/addTournament/addTournament';
import AddUser from './components/addUser/addUser';
import AdminTournament from './components/adminTournament/adminTournament';
import AdminProduct from './components/adminProducts/adminProducts';
import AdminUser from './components/adminUser/adminUser';
import Login from "./components/login/login";
import ShopCart from "./components/shopcart/shopcart";
import TorneosFetcher from './components/torneosfetcher/torneosFetcher';
import TorneosDetails from './components/torneoDetails/torneoDetails';
import TournamentPage from './components/tournamentPage/tournamentPage';
import UsuarioDetails from './components/usuarioDetails/usuarioDetails';
import EditUser from './components/editUser/editUser';
import EditProduct from "./components/editProduct/editProduct";
import EditTournament from "./components/editTournament/editTournament";
import { useEffect, useState } from "react";





const App = () => {

  const [carrito, setCarrito] = useState([])
  const [sumador, setSumador] = useState(0)

  const addProduct = (props) => {

    setCarrito([...carrito, props])
    setSumador(sumador + 1)

  }

  useEffect(() => {

  }, [carrito]);

  const onDelete = (index) => {



    setCarrito(carrito.filter((producto, idx) => idx !== index));
    setSumador(sumador - 1)

  }


  return (
    <Router>

      <Navbar sumador={sumador} />
      <div className="colocador">
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>

          <Route path="/products/:pageNumber" >

            <Producto />
          </Route>

          <Route path="/product/:productId" >
            <ProductDetails carrito={carrito} addProduct={addProduct} />
          </Route>

          <Route path="/search/:buscador">


            <Search />

          </Route>

          <Route path="/register">


            <Register />

          </Route>

          <Route path="/login">


            <Login />

          </Route>

          <Route path="/carrito">

            <ShopCart onDelete={onDelete} carrito={carrito} />


          </Route>

          <Route path="/torneos/:page">

            <TorneosFetcher />

          </Route>


          <Route path="/user/:usuarioId">

            <UsuarioDetails />

          </Route>

          <Route path="/torneo/:torneoNombre">

            <TorneosDetails />

          </Route>

          <Route path="/tournament/:tournament/:tournamentNombre">

            <TournamentPage />

          </Route>

          <Route path="/addProduct">

            <AddProduct />

          </Route>

          <Route path="/addTournament/">

            <AddTournament />

          </Route>

          <Route path="/addUser/">

            <AddUser />

          </Route>

          <Route path="/adminTournament/:page">

            <AdminTournament />

          </Route>

          <Route path="/adminProduct/:page">

            <AdminProduct />

          </Route>

          <Route path="/adminUser/:page">

            <AdminUser />

          </Route>

          <Route path="/editUser">

            <EditUser />

          </Route>

          <Route path="/editProduct/:idProduct">

            <EditProduct />

          </Route>

          <Route path="/editTournament/:idTournament">

            <EditTournament />

          </Route>

          <Redirect to="/home" />
        </Switch>



        <Footer />
      </div>
    </Router>


  )

}



export default App;
