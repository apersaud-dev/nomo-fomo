import { Link } from 'react-router-dom';
import Logo from './../../assets/Images/nomo-fomo.svg';
import './Home.scss';

function Home() {
    return (
        <main className="home">
            <img src={Logo} alt="NOMO FOMO logo" className="home__logo"/>
            <h1 className="home__slogan" >Filler content for now</h1>
            <Link to="/map" className="home__button" >Get Started</Link>
            <hr />
            <p>or</p>
            <hr />
            <Link to="/login">Business User Login</Link>
            
        </main>
    )
}

export default Home;

// <a href="http://localhost:8080/auth/google">Business Login</a>