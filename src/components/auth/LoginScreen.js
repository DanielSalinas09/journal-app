import React from 'react';

import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator'
import { startGoogleLogin } from '../../actions/auth';
import { startLoginEmailPassword } from './../../actions/auth';
import { removeErrorAction, setErrorAction } from '../../actions/ui';


export const LoginScreen = () => {

    const dispatch = useDispatch();
    const {msgError,loading} = useSelector(state => state.ui)
    
    const[formValue,handleInputChange ] =useForm({
        email:'daniel@gmail.com',
        password:'123456'
    })
    const {email,password}=formValue;
    
    const handleLogin=(e)=>{
        e.preventDefault()
        console.log('no se envio');
        if(isValidate()){
            dispatch(startLoginEmailPassword(email,password));
            console.log('enviado');
        }
        
        
    }
    const isValidate=()=>{
        if(!validator.isEmail(email)){
            dispatch(setErrorAction('Este no es un email valido') )
            console.log('este no es un email');
            return false;
        }else if(password.trim().length <=5){
            dispatch(setErrorAction('La password debe tener mas de 6 caracteres') )
            return false
        }
        dispatch(removeErrorAction());
        return true
    }
    const handleGoogleLogin=()=>{
        dispatch(startGoogleLogin())
    }

    return (
        <>
            <h3 className='auth__title'>Login</h3>
            <form onSubmit={handleLogin} className='animate__animated animate__fadeIn animate__faster '>
                {
                    msgError &&
                    (
                        <div className='auth__alert-error'>
                            {msgError}
                        </div>
                    )
                }
                <input
                    className='auth__input'
                    type='text'
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    onChange={handleInputChange }
                    value={email}
                />
                <input
                    className='auth__input'
                    type='password'
                    placeholder='*****'
                    name='password'
                    onChange={handleInputChange }
                    value={password}
                />
                <button
                    className='btn btn-primary btn-block'
                    type='submit' 
                    disabled={loading}  
                >
                    Login
                </button>
                <hr />
                <div className='auth__social-networks'>
                    <h4>Iniciar sesion con Google </h4>
                    <div className="google-btn" onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link to='/auth/register' className='link '>
                    Crear una cuenta nueva
                </Link>
            </form>
        </>

    )
}