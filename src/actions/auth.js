import Swal from 'sweetalert2'
import { firebase, googleProvider } from "../firebase/firebase-config";
import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPassword=(email,password)=>{
    return (dispatch)=>{
        dispatch(startLoading());
       firebase.auth().signInWithEmailAndPassword(email,password)
        .then(({user})=>{
            console.log(user);
            dispatch(finishLoading());
            dispatch(login(user.uid,user.displayName))
        })
        .catch(e=>{
            dispatch(finishLoading());
            console.log(e);
            Swal.fire('Error',e.message,'error');
        })
    }
}
export const startRegisterWithEmailPassword=(email,password,name)=>{
    return (dispatch)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(async({user})=>{
                await user.updateProfile({displayName:name})
                console.log(user);
                dispatch(login(user.uid,user.displayName));
            })
            .catch(e=>{
                console.log(e);
                Swal.fire('Error',e.message,'error');
            })
    }
}

export const startGoogleLogin=()=>{
    return (dispatch)=>{
        firebase.auth().signInWithPopup(googleProvider)
            .then(({user})=>{
                dispatch(login(user.uid,user.displayName));
            })

    }
};

export const login=(uid,displayName)=>{
    return {
        type:types.login,
        payload:{
            uid,
            displayName
        }
    }
};

export const startLogout=()=>{
    return async(dispatch)=>{
        await firebase.auth().signOut();
        dispatch(logout())
    }
}
export const logout=()=>{
    return {
        type:types.logout
    }
}
