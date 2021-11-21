import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from "./Navigation/Navigation";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className='header'>
      <NavLink className='header__logo logo' to='/'><img src={logo} alt="Логотип сайта"/></NavLink>
      <Navigation />
    </header>
  )
}

export default Header;
