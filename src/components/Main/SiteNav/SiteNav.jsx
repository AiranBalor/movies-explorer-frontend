import './SiteNav.css';

function SiteNav(props) {
  return (
    <a
      href={props.to}
      target={props.openNewTab ? "_blank" : "_self"}
      rel="noreferrer"
      className="SiteNav-link"
      id={props.size}
    >
      {props.name}
    </a>
  );
}

export default SiteNav;