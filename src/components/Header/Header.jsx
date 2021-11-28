import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from "./Navigation/Navigation";
import { NavLink } from "react-router-dom";

function Header({ isLogin }) {
  return (
    <header className='header'>
      <NavLink className='header__logo logo' to='/'><img src={logo} alt="Логотип сайта"/></NavLink>
      <Navigation isLogin={isLogin}/>
    </header>
  )
}

export default Header;
