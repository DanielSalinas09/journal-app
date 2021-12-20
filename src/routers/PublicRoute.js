import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';


export const PublicRoute = ({children,isLogged}) => {
    
    return isLogged
        ?<Navigate to='/'/>
        :children

    
}
PublicRoute.prototype={
    isLogged:PropTypes.bool.isRequired
}
