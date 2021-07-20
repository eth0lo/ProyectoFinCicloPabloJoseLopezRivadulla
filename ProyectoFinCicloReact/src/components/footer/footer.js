import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook} from '@fortawesome/free-brands-svg-icons' ;
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faGithubSquare} from '@fortawesome/free-brands-svg-icons';
import {faInstagramSquare} from '@fortawesome/free-brands-svg-icons';

import "./footer.css";

const Footer = () => <footer><p className ="container d-flex justify-content-between contenedor "><a href="https://facebook.com"><FontAwesomeIcon icon={faFacebook} /></a> <a href="https://instagram.com"><FontAwesomeIcon icon={faInstagramSquare} /></a>  <a href ="https://twitter.com"><FontAwesomeIcon icon={faTwitter} /></a> <a href ="https://github.com"><FontAwesomeIcon icon={faGithubSquare} /></a></p></footer>;

export default Footer;