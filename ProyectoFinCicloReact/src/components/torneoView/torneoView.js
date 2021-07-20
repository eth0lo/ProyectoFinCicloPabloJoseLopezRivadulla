import './torneoView.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const TorneoPrepper = ({ torneoSmash, torneo }) => {

  const user = JSON.parse(sessionStorage.getItem('user'));
  let imagen = "";
  const [mensaje, setMensaje] = useState(null);
  let rol = null;
  if (user) {

    user.roles.forEach(roles => {

      if (roles === "ROLE_ADMIN" || roles === "ROLE_MODERATOR") {

        rol = roles;

      }

    });
  }

  const formulario = {
    texto: "Probando",
    torneoComentarios: {
      id: torneo.id
    },
    user: {
      id: user?.id
    }
  };

  useEffect(() => {


  }, [torneo])

  const [formState, setFormState] = useState(formulario);


  const handleChange = event => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    })
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + user?.accessToken);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Headers", "*");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(formState),
    redirect: 'follow'
  };

  const onSubmit = (event) => {
    event.preventDefault()


    fetch('http://localhost:8080/api/comments/comments/', requestOptions)


      .then((response) => response.json()).then(data => setMensaje(data.message));
    window.location.reload();

  }

  const onDelete = (index) => {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user.accessToken);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Headers", "*");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'

    };
    fetch('http://localhost:8080/api/comments/comments/' + index, requestOptions)
    setTimeout(function () { window.location.reload(); }, 500);

  }


  if (torneoSmash === null) {
    return (
      <>

        <div><p className="alert alert-danger">Error: Datos de torneo incorrectos</p> </div>

      </>
    )

  } else {


    if (torneoSmash.events?.length > 0) {
      return (
        <>
          {torneoSmash.images?.map((image => image.type === "banner" && (<img src={image.url} alt={imagen} className="img-responsive imagenBanner"></img>)))}
          <div className="container text-center">

            <h1 className="mt-4 piefoto">{torneoSmash.name}</h1>


            {(torneoSmash.rules && <div>
              <p className="text-center mt-4">
                <a className="btn btn-secondary collapseTitle" data-toggle="collapse" href="#collapseRules" role="button" aria-expanded="false" aria-controls="collapseExample">
                  Reglas
                </a>
              </p>

              <div className="collapse" id="collapseRules">
                <div className="card card-body collapsebodyTournament ">
                  {torneoSmash.rules}
                </div>
              </div>
            </div>)}

            <h1 className="mt-4 piefoto">Eventos: </h1>
            
            {torneoSmash.events?.map((evento => (
              <div key = {evento.id}>

                <p className="text-center mt-4">
                  <a className="btn btn-secondary collapseTitle" data-toggle="collapse" href= "#collapseEvent" role="button" aria-expanded="false" aria-controls="collapseExample">
                    {evento.name} {evento.entrants.pageInfo.total} participantes
                        </a>
                </p>

                <div className="collapse" id="collapseEvent">
                  <div className="card card-body collapsebodyTournament ">
                    <h1>  Resultados:</h1>
                    {evento.standings.nodes && (<div><table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Posición</th>
                          <th scope="col">Nombre</th>

                        </tr>
                      </thead>
                      <tbody>

                        {evento.standings.nodes?.map((user) => (<tr><th scope="row">{user.placement} º</th><Link to={`/user/${user.entrant.participants[0].user?.discriminator}`}><a className="participantes">{user.entrant.name} </a></Link></tr>))}

                      </tbody>
                    </table></div>)}
                  </div>
                </div>

              </div>


            )))}



            <Link to={{ pathname: `https://smash.gg/tournament/${torneo.url}` }} target="_blank" ><button type="button" className="btn btn-danger mt-4 mb-4 w-100">Registrate Aquí</button></Link>





            

            <p className="text-center mt-4">
                <a className="btn btn-secondary collapseTitle" data-toggle="collapse" href="#collapseComentarios" role="button" aria-expanded="false" aria-controls="collapseExample">
                Comentarios:
                </a>
              </p>

              <div className="collapse" id="collapseComentarios">
                <div className="card card-body collapsebodyTournament ">
                {torneo.comentario?.map((comentarios => (<div className="container-fluid border border-dark" >
                <div className="row filaComentarios">
                <div className="col-md-10 text-left"> 
                <div className="commentUsuario"> {comentarios.user?.username} </div>
                <div className="commentFecha"> Escrito el día: {comentarios.createAt}  </div>
                
                <p className="textoComentario">{comentarios.texto}</p>
                
                </div>
              
                {rol && (<button className="btn btn-danger col-md-1 mr-1 h-50 botonEliminarTorneoPreppper" onClick={() => onDelete(comentarios.id)}>Eliminar</button>)}
              </div>
            </div>)))}
            
                </div>
              </div>

              <form onSubmit={onSubmit}>
              <div className="form-group text-left">
                {user && (<label for="exampleFormControlTextarea1" className="">Escriba su comentario</label>)}
                {!user && (<div className="alert alert-primary">Debes estar logeado para poder dejar comentarios </div>)}
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="texto" disabled={!user} onChange={handleChange}></textarea>
                <button type="submit" className="btn btn-primary mt-3 ">Escribir comentario</button>
              </div>

            </form>


          </div>

        

        </>






      )
    } else {
      return <>
        <div className="container-fluid text-center mt-4">

          <div class="spinner-border text-dark" role="status">
            <span class="sr-only">Cargando...</span>
          </div>
        </div>
      </>

    }
  }
}

export default TorneoPrepper;