import { Link } from 'react-router-dom';
import './Home.scss';

function Home() {
    return (
        <main>
            <img src="" alt="NOMO FOMO logo"/>
            <h1>Filler content for now</h1>
            <Link to="/map" >Get Started</Link>
            <hr />
            <p>or</p>
            <hr />
            <Link to="/login">Business User Login</Link>
            
        </main>
    )
}

export default Home;

// <a href="http://localhost:8080/auth/google">Business Login</a>