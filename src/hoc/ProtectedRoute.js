import {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AppContext} from '../contexts/AppContext';

function ProtectedRoute(props) {
  const value = useContext(AppContext);
  return (
    <Route>
      {value.loggedIn ? props.children : <Redirect to="/signin"/>}
    </Route>
  )
}

export default ProtectedRoute;
