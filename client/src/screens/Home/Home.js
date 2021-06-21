import { Link } from 'react-router-dom';
import Logo from './../../assets/Images/nomo-fomo.svg';
import './Home.scss';

function Home() {
    return (
        <main className="home">
            <div className="home__container">
                <img src={Logo} alt="NOMO FOMO logo" className="home__logo"/>
                <h1 className="home__slogan" >Switch off your FOMO</h1>
                <Link to="/map" className="home__button" >Get Started</Link>
                <p className="home__info">Are you a business? Login below</p>
                <a href="http://localhost:8080/auth/google" className="home__button home__button--secondary">Login Now</a>
            </div>
        </main>
    )
}

export default Home;