import "./usuarioPage.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
const UsuarioPage = ({ usuario }) => {



    if (usuario.player) {
        return (
            <>
                <div className="container">


                    <div className="row mt-5">
                        <div className="col-md-6">
                            {usuario.images.length === 0 && (<div><img src="/imagenes/noprofile.png" alt="No tiene foto" className="fotoUsuario" /></div>)}
                            {usuario.images.length > 0 && (<div><img src={usuario.images[0].url} alt={usuario.player.gamerTag} className="fotoUsuario" /></div>)}

                            <div className="row">
                                {usuario.authorizations?.map((user) => (
                                    <div className="col-md-4">
                                        {user.type === "TWITTER" && (
                                            <div>
                                                <p className="iconoTwitter">
                                                    <Link to={{ pathname: `https://twitter.com/${user.externalUsername}` }} target="_blank">
                                                        <FontAwesomeIcon icon={faTwitter} />
                                                    </Link> </p></div>)}

                                        {user.type === "DISCORD" && (
                                            <div>
                                                <p className="iconoDiscord">
                                                    <FontAwesomeIcon icon={faDiscord} /></p>

                                                <p>{user.externalUsername}</p>  </div>)}
                                        {user.type === "TWITCH" && (
                                             <div>
                                             <p className="iconoTwitch">
                                        <Link to={{ pathname: `https://twitch.tv/${user.externalUsername}` }} target="_blank"> 
                                        <FontAwesomeIcon icon={faTwitch} /></Link>
                                            </p>
                                            </div>
                                        )}

                                    </div>


                                ))}
                            </div>
                        </div>

                        <div className="col-md-6">

                            <h2 className="titulo text-center">{usuario.player.gamerTag}</h2>


                            {(usuario.bio && <div>
                                <p className="text-center mt-4">
                                    <a className="btn btn-secondary collapseTitle" data-toggle="collapse" href="#collapseRules" role="button" aria-expanded="false" aria-controls="collapseExample">
                                        Biografia
                                    </a>
                                </p>

                                <div className="collapse" id="collapseRules">
                                    <div className="card card-body collapseResult">
                                        {usuario.bio && (<p className="text-center">{usuario?.bio}</p>)}
                                    </div>
                                </div>
                            </div>)}

                            <div className="mb-4">
                                <p className="text-center mt-4 ">
                                    <a className="btn btn-secondary collapseTitle" data-toggle="collapse" href="#collapseResult" role="button" aria-expanded="false" aria-controls="collapseExample">
                                        Torneos:
                                    </a>
                                </p>

                                <div className="collapse" id="collapseResult">
                                    <div className="card card-body mb-3 collapseResult">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Último torneo</th>
                                                    <th scope="col">Nombre del Torneo</th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {usuario.tournaments.nodes?.map((torneo, index) => (<tr><th scope="row">{index + 1}</th> <Link to={`/tournament/${torneo.slug}`}><a>{torneo.name} </a></Link></tr>))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>





                        </div>
                    </div>
                </div>


            </>

        );
    }

    else {
        return <>
            <div className="container-fluid text-center mt-4">

                <div class="spinner-border text-dark" role="status">
                    <span class="sr-only">Cargando...</span>
                </div>
            </div>
        </>

    }
}

export default UsuarioPage;