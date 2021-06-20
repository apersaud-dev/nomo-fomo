import { Link } from 'react-router-dom';
import LinearLogo from './../../assets/Images/nomo-fomo-linear.svg';
import './Header.scss';
function Header(props) {
    const path = props.match.path; 
    return(
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__link--home">
                    <img src={LinearLogo} alt="NOMO FOMO logo" className="header__logo" />
                </Link>
                <div className="header__nav">
                    <Link 
                        to="/profile"
                        className={path === "/profile" ? "header__link header__link--active" : "header__link"}
                    >
                        Events
                    </Link>
                    <Link 
                        to="/profile-edit" 
                        className={path === "/profile-edit" ? "header__link header__link--active" : "header__link"}
                    >
                        Edit Profile
                    </Link>
                    <Link to="http://localhost:8080/logout" className="header__link">Logout</Link>
                </div>
            </div>
        </header>
    )
}

export default Header;