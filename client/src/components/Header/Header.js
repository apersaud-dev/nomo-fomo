import { Link } from 'react-router-dom';
import LinearLogo from './../../assets/Images/nomo-fomo-linear.svg';
import './Header.scss';
function Header(props) {
    // console.log(props);
    return(
        <header className="header">
            <div className="header__container">
                <img src={LinearLogo} alt="NOMO FOMO logo" className="header__logo" />
                <div className="header__nav">
                    <Link to="/profile-edit" className="header__link">Edit Profile</Link>
                    <Link to="http://localhost:8080/logout" className="header__link">Logout</Link>
                </div>
            </div>
        </header>
    )
}

export default Header;