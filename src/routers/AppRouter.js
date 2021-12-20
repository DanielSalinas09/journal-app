import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen"
import { JournalScreen } from "../components/journal/JournalScreen"
import { AuthRouter } from "./AuthRouter"
import {firebase} from '../firebase/firebase-config'
import { useDispatch } from "react-redux"
import { login } from "../actions/auth"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"
import { startLoadingNotes } from "../actions/notes"



export const AppRouter = () => {
    const dispatch=useDispatch();
    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async(user)=>{
            if(user?.uid){
                dispatch(login(user.uid,user.displayName));
                setIsLoggedIn(true);
                
                dispatch(startLoadingNotes(user.uid));
            }else{
                setIsLoggedIn(false)
            }
            setChecking(false)
        })
    },[dispatch,setChecking,setIsLoggedIn])

    if(checking){
        return (
            <h1>Espere...</h1>
        )
    }

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path='/auth/*' element={<PublicRoute children={<AuthRouter /> } isLogged={isLoggedIn}/>} />
                    <Route path='/' element={<PrivateRoute children={<JournalScreen />} isLogged={isLoggedIn} /> } />
                    <Route path='/*' element={<LoginScreen />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
