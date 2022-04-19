import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";

const providerFacebook = new FacebookAuthProvider();
const providerGoogle = new GoogleAuthProvider();

export const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe;
    }, [])

    const value = { 
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        loginGoogle,
        loginFacebook
     }

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return auth.signOut();
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email){
        return auth.currentUser.updateEmail(email);
    }

    function updatePassword(password){
        return auth.currentUser.updatePassword(password);
    }

    function savedLogin(token){
        return auth.signInWithCustomToken(token)
    }

    function loginGoogle(){
        return auth.signInWithPopup(providerGoogle);
    }

    function loginFacebook(){
        return auth.signInWithPopup(providerFacebook);
    }

    return (
        <AuthContext.Provider value={ value }>
            { !loading && children }
        </AuthContext.Provider>
    )
}
