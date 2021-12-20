import React from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from './../../hooks/useForm';
import { setErrorAction,removeErrorAction } from './../../actions/ui';
import { startRegisterWithEmailPassword } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch= useDispatch();
    const {msgError} = useSelector(state => state.ui);
    
    const [formValue,handleInputChange]=useForm({
        name:'Daniel Salinas',
        email:'daniel@gmail.com',
        password:'123456',
        password2:'123456'
    });
    const {name,email,password,password2}=formValue;
    const handleRegister=(e)=>{
        e.preventDefault();
        if(isFormValid()){
            console.log('formulario correcto');
            dispatch(startRegisterWithEmailPassword(email,password,name));
        }
        
    }
    const isFormValid=()=>{
        if(name.trim().length ===0 ){
            dispatch(setErrorAction('El Nombre es Requerido'));
            
            return false;
        }else if(!validator.isEmail(email)){
            dispatch(setErrorAction('El Email no es valido'));
            
            return false;
        }else if(password!==password2 || password.length<5){
            dispatch(setErrorAction('Las contraseñas no coinciden o debe ser mayor de 5 caracteres'));
            
            return false
        }
        dispatch(removeErrorAction());
        return true;
    }
    return (
        <>
            <h3 className='auth__title'>Registrar</h3>
            <form onSubmit={handleRegister} className='animate__animated animate__fadeIn animate__faster'>
                {
                    msgError &&
                    (
                        <div className='auth__alert-error '>
                            {msgError}
                        </div>
                    )
                    
                }
                <input
                    className='auth__input'
                    type='text'
                    placeholder='Su nombre'
                    name='name'
                    autoComplete='off'
                    onChange={handleInputChange}
                    value={name}
                />

                <input
                    className='auth__input'
                    type='text'
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    onChange={handleInputChange}
                    value={email}
                />
                <input
                    className='auth__input'
                    type='password'
                    placeholder='Contraseña'
                    name='password'
                    onChange={handleInputChange}
                    value={password}
                />
                <input
                    className='auth__input'
                    type='password'
                    placeholder='Confirmar contraseña'
                    name='password2'
                    onChange={handleInputChange}
                    value={password2}
                />
                <button
                    className='btn btn-primary btn-block mb-5'
                    type='submit'

                >
                    Registrar
                </button>


                <Link to='/auth/login' className='link'>
                    Ya esta registrado?
                </Link>
            </form>
        </>
    )
}
