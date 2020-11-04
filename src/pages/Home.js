import React, {useState} from 'react'
import Navigation from '../components/Navigation.js'

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import db from '../FirebaseConfig';



const Home = ({ setUserId, userId }) => {

    const [ registerEmail, setRegisterEmail ] = useState("");
    const [ registerPassword, setRegisterPassword ] = useState("");
    const [ registerName, setRegisterName] = useState("")
    const [ loginEmail, setLoginEmail ] = useState("");
    const [ loginPassword, setLoginPassword ] = useState("");
    // const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    // const [ userId, setUserId ] = useState(null)

    const handleRegister = async (e) => {
        e.preventDefault()
        firebase
        .auth()
        .createUserWithEmailAndPassword(registerEmail, registerPassword)
        .then(async data => {
            const dataToAdd = {
                fish_checked: [],
                bugs_checked: [],
                // name: registerName
            }
            const addUser = await db.collection("users").doc(data.user.uid).set(dataToAdd)
            // setIsLoggedIn(true)
                setUserId(firebase.auth().currentUser.uid)
            console.log(firebase.auth().currentUser.uid)
        })
        .catch(error => console.log(error))
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
            // setIsLoggedIn(true)
            setUserId(firebase.auth().currentUser.uid)
            console.log(firebase.auth().currentUser.uid)

        })
        .catch(error => console.log(error))

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

    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")

    // const handleLogin = (e) => {
    //     e.preventDefault()
    //     console.log(e)
    // }

    return (
        <>
            <div className="header">
                <Navigation />
                <h2 className="animal-title">Home</h2>
            </div>
            <form onSubmit={handleRegister}>
                <label>Email Address:</label>
                <input type="text" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                <label>Password:</label>
                <input type="text" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                <input type="submit" value="Register" />
            </form>
            <form onSubmit={handleLogin}>
                <label>Email Address:</label>
                <input type="text" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                <label>Password:</label>
                <input type="text" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                <input type="submit" value="Login" />
            </form>

        {userId && <p>Welcome!</p>}

        </>
    )
}

export default Home;