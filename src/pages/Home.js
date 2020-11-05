import React, { useState, useEffect } from 'react'
import './Home.css'
import Navigation from '../components/Navigation.js'
import { Link } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import db from '../FirebaseConfig';



const Home = () => {

    const [ registerEmail, setRegisterEmail ] = useState("");
    const [ registerPassword, setRegisterPassword ] = useState("");
    const [ confirmRegisterPassword, setConfirmRegisterPassword ] = useState("")
    const [ loginEmail, setLoginEmail ] = useState("");
    const [ loginPassword, setLoginPassword ] = useState("");
    const [ loginError, setLoginError ] = useState("")
    const [ showRegisterForm, setShowRegisterForm ] = useState(false)
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ currentUser, setCurrentUser ] = useState({})
    // const [ userId, setUserId ] = useState(null)

    useEffect(() =>{
        getUser()
    }, [])

    const getUser = () => {
        firebase.auth().onAuthStateChanged( async (user) => {
          if (user) {
            console.log(user)
            setCurrentUser(user)
            setIsLoggedIn(true)
          } else {
            setCurrentUser({})
          }
        })
        console.log("currentUser", currentUser)
      }

    const handleRegister = async (e) => {
        e.preventDefault()
        if (confirmRegisterPassword === registerPassword){
            firebase
            .auth()
            .createUserWithEmailAndPassword(registerEmail, registerPassword)
            .then(async data => {
                const dataToAdd = {
                    fish_checked: [],
                    bugs_checked: [],
                    art_checked: [],
                    // name: registerName
                }
                const addUser = await db.collection("users").doc(data.user.uid).set(dataToAdd)
                setIsLoggedIn(true)
                setRegisterEmail("")
                setRegisterPassword("")
                setConfirmRegisterPassword("")
                setLoginError("")
            })
            .catch(error => handleLoginError(error))

            

        }
        else {
            setLoginError("Passwords do not match. Please try again")
        }
    }

    // const auth = firebase.app().auth();
    // auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    //     .then(() => auth.signInWithCustomToken(token));

    const handleLogin = (e) => {
        e.preventDefault()
        firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword))
        .then(() => {
            setLoginEmail("")
            setLoginPassword("")
            setIsLoggedIn(true)
            setLoginError("")
        })
        .catch(error => handleLoginError(error))

        

        // firebase
        // .auth()
        // .signInWithEmailAndPassword(loginEmail, loginPassword)
        // .then(() => {
        //     // setIsLoggedIn(true)
        //     setUserId(firebase.auth().currentUser.uid)
        //     console.log(firebase.auth().currentUser.uid)

        // })
        // .catch(error => console.log(error))
        // if(firebase.auth().currentUser){
        //     setIsLoggedIn(true)
        // }
    }

    const handleLogOut = () => { 

        // firebase.auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         console.log("user")
        //     } else {
        //         console.log("no user")
        //     }
        // }) 

        firebase.auth().signOut()
        .then(() => {
            // Sign-out successful.
            setIsLoggedIn(false)
            setShowRegisterForm(false)
            console.log("out")
        }).catch(function(error) {
            // An error happened.
            console.log(error)
        })
    }

    const handleLoginError = (errorMessage) => {
        switch (errorMessage.code) {
            case "auth/wrong-password":
                setLoginError("The password is invalid. Please try again")
                break;
            case "auth/invalid-email":
                setLoginError("The email address is badly formatted. Please enter a valid Email address")
                break;
            case "auth/user-not-found":
                setLoginError("This Email address doesn't match any users. Please check your Email address or Register")
                break
            case "auth/weak-password":
                setLoginError("Password must be at least 6 characters")
                break
            case "auth/email-already-in-use":
                setLoginError("The email address is already in use by another account.")
            }
    }

    return (
        <>
            <div className="header">
                <Navigation />
                <h2 className="animal-title">Home</h2>
                {currentUser.email && <p className="signed-in-as">Signed in as <br/>{currentUser.email}</p>}
            </div>
            <div className="home-container">
                {!isLoggedIn ? 
                    showRegisterForm ? 
                        <div>
                            <p className="home-title">Register</p>
                            <form onSubmit={handleRegister}>
                                <label>Email Address:</label>
                                <input type="text" required value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} /><br/>
                                <label>Password:</label>
                                <input type="password" required value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} /><br/>
                                <label>Confirm Password:</label>
                                <input type="password" required value={confirmRegisterPassword} onChange={(e) => setConfirmRegisterPassword(e.target.value)} /><br/>
                                {loginError && <p className="login-error">Error: {loginError}</p>}
                                <input className="home-button" type="submit" value="Register" />
                            </form>
                            <button className="home-button" onClick={() => setShowRegisterForm(false)}>Or click here to Login</button>    
                        </div>
                    :
                        <div>
                            <p className="home-title">Login</p>
                            <form onSubmit={handleLogin}>
                                <label>Email Address:</label>
                                <input type="text" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} /><br/>
                                <label>Password:</label>
                                <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} /><br/>
                                {loginError && <p className="login-error">Error: {loginError}</p>}
                                <input className="home-button" type="submit" value="Login" />
                            </form>
                            <button className="home-button" onClick={() => setShowRegisterForm(true)}>Or click here to Register</button>    
                        </div>
                :
                    <div>
                        <p className="home-title">Welcome {currentUser.email}!</p>
                        <button className="home-button" onClick={() => handleLogOut()}>Click here to Log out</button> 
                    </div>
                }
                <p className="home-text">Go to <Link to="/bugs">Bugs</Link>, <Link to="/fish">Fish</Link> or <Link to="/art">Art</Link> and click on a name to get information about 
                    any fish, bug or piece of art in Animal Crossing! </p>
                <p className="home-text">Also log in with an Email Address to keep track of what bugs and fish you've collected.</p>
            </div>
        </>
    )
}

export default Home;