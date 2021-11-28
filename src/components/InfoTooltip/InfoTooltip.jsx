import './InfoTooltip.css';
import Preloader from "../Preloader/Preloader";

function InfoTooltip(props) {
  console.log(props.isLoading);
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'} popup_type_${props.name}`} onClick={(event) => {
      if (event.target.classList.contains('popup')) props.onClose()
    }}>
      <div className="popup__container">
        {!props.isLoading && <button type="button" className="button__modal button_type_close-popup" onClick={props.onClose}/>}
        {props.statusImage &&
        <img src={props.statusImage} alt="Статус запроса" className="popup__image popup__image_type_status"/>}
        {props.isLoading && <Preloader />}
        <h2 className={`popup__heading`}>{props.statusMessage}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
