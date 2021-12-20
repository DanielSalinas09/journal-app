import { Navigate } from "react-router-dom"
import { PropTypes } from 'prop-types';


export const PrivateRoute = ({children,isLogged}) => {
    
    return isLogged
        ?children
        : <Navigate to='/auth/login'/>
}
PrivateRoute.prototype={
    isLogged:PropTypes.bool.isRequired
}
