import { Link } from 'react-router-dom';

const TournamentView = ({ torneoSmash, tournamentNombre}) => {

    let imagen = "";

    if (torneoSmash === null) {
        return (
            <>

                <div><p>Error: Datos de torneo incorrectos</p> </div>

            </>
        )

    } else {


        if (torneoSmash.events?.length > 0) {
            return (
                <>
                    {torneoSmash.images?.map((image => image.type === "banner" && (<img src={image.url} alt={imagen} className="img-responsive imagenBanner"></img>)))}
          <div className="container text-center">

            <h1 className="mt-4">{torneoSmash.name}</h1>


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

            <h1 className="mt-4">Eventos: </h1>
            
            {torneoSmash.events?.map((evento => (
              <div>

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

                        {evento.standings.nodes?.map((user) => (<tr><th scope="row">{user.placement} º</th><Link to={`/user/${user.entrant.participants[0].user.discriminator}`}><a className="participantes">{user.entrant.name} </a></Link></tr>))}

                      </tbody>
                    </table></div>)}
                  </div>
                </div>

              </div>


            )))}



            <Link to={{ pathname: `https://smash.gg/tournament/${tournamentNombre}` }} target="_blank" ><button type="button" className="btn btn-danger mt-4 mb-4 w-100">Registrate Aquí</button></Link>



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

export default TournamentView;