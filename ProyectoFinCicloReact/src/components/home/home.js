import "./home.css";
import RowHome from "../rowHome/rowHome";
import Carrusel from "../carrusel/carrusel";
import { NavLink } from "react-router-dom";


{/*Esta es la página principal. Se manda Rowhome que tiene descripción y el Carrusel */ }
const Home = () =>

    <div>

        <p className ="piefoto text-center mt-4">Resultados Recientes: </p>
        <div>
            <NavLink to = "torneo/knockout-city-community-tournament"><img src ="/imagenes/KnockoutCity.png" alt = "Knockout City" className="fotoBannerHome img-fluid">

            </img>
            </NavLink>
        </div>
        <div className="justify-content-center">
      
        <div className = "col-md-12">
            <Carrusel />
        </div>

        </div>

        <div className="container-fluid mb-5 justify-content-center">
            
                <div className="col-md-12  textohomeDescripcion ">
                    <p className="piefoto ml-4">Ven a conocernos! MadridFGC es el mejor local para jugar a Juegos de Lucha de toda España! </p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1073.8255914835036!2d-3.642474275529732!3d40.4257411785551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422f681dbfffff%3A0x6178b614d0e69875!2sMadrid%20FGC!5e0!3m2!1ses!2ses!4v1622562406365!5m2!1ses!2ses" className="border-0 img-fluid mapaHomePage" allowfullscreen="" loading="lazy"></iframe>
                </div>
         
            </div>
        </div>
   

export default Home;