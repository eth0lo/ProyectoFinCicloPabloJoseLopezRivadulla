import "./carrusel.css";
import CarruselFetcher from "../carruselfetcher/carruselfetcher";

{/*Esto es el carrusel de la página Home.CarruselFetcher coge la informacion de la BBDD y construye los items del Carrusel. Comentamos más en la propia clase */}

const Carrusel = () =>



<div id="demo" className="carousel slide carrusel" data-ride="carousel">





<div className="carousel-inner ">
 
  


<p className="piefoto">Productos Destacados</p>


<CarruselFetcher />

  


</div>


<a className="carousel-control-prev flecha" href="#demo" data-slide="prev">
  <span className="carousel-control-prev-icon"></span>
</a>
<a className="carousel-control-next flecha" href="#demo" data-slide="next">
  <span className="carousel-control-next-icon"></span>
</a>
</div>




export default Carrusel;