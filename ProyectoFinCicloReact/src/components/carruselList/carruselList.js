import CarruselImg from '../carruselImg/carruselImg';



const CarruselList = ({ products }) => 



products.map(function (product, index) {

  


    
    let comprobador = (index === 0 ) ? 'carousel-item active' : 'carousel-item '; 
    

    return <CarruselImg key={`product-${product.id}`} product={product} className= {comprobador} contador = {index} />
   
})





export default CarruselList;