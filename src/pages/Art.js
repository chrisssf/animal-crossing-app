// import React, { useState, useEffect } from 'react';
// import ListElement from '../components/ListElement.js';
// import Navigation from '../components/Navigation.js'

// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import db from '../FirebaseConfig';

// import './Art.css';


// const Art = () => {

//     const [allArtData, setAllArtData] = useState([])
//     const [dataRetreived, setDataRetrieved] = useState(false)
//     const [collectedArt, setCollectedArt] = useState([])
//     const [ currentUser, setCurrentUser ] = useState("")
  
//     useEffect(() =>{
//       fetch('https://acnhapi.com/v1/art')
//         .then(res => res.json())
//         .then(art => setAllArtData(art))
//         .then(() => getArtCollectedFromDatabase())
//         .then(() => getUser())
//         .then(() => setDataRetrieved(true))
//     }, [])

//     const updateCollectedArtinDB = (collectedArtForDB) => {
//           // firebase.auth().onAuthStateChanged((user) => {
//           //   if (user) {
//           //     const userRef = db.collection("users").doc(user.uid)
//           //     return userRef.update({[databaseField]: collectedAnimalsForDB})
//           //     .catch(error => console.log(error))
//           //   }
//           // })
//           const userRef = db.collection("users").doc(currentUser.uid)
//           return userRef.update({art_checked: collectedArtForDB})
//           .catch(error => console.log(error))
//       }

//     const getArtCollectedFromDatabase = async () => {
//         firebase.auth().onAuthStateChanged( async (user) => {
//             if (user) {
//                 const userRef = db.collection("users").doc(user.uid)
//                 const doc = await userRef.get()
//                 if(!doc.exists){
//                     console.log("No such document")
//                 } else {
//                     console.log("here")
//                     setCollectedArt(doc.data()["art_checked"])
//                 }
//             }
//         })
//     }

//     const getUser = () => {
//         firebase.auth().onAuthStateChanged( async (user) => {
//             if (user) {
//                 console.log(user)
//                 setCurrentUser(user)
//             } else {
//                 setCurrentUser({})
//             }
//         })
//         console.log("currentUser", currentUser)
//     }

//     const artChecklist = () => {
//         const artChecklistElements = []
//         const provisionalCollectedArt = collectedArt.concat()
    
//         const allArtDataOrderedAlphabetically = {};
//         Object.keys(allArtData).sort().forEach(key => {
//           allArtDataOrderedAlphabetically[key] = allArtData[key];
//         });
    
    
//         for (const art in allArtsDataOrderedAlphabetically){
//           animalsChecklistElements.push(
//             <ListElement 
//               animal={animal} 
//               animalCategory={animalCategory} 
//               allAnimalsData={allAnimalsData} 
//               provisionalCollectedAnimals={provisionalCollectedAnimals} 
//               setCollectedAnimals={setCollectedAnimals}
//               updateCollectedAnimalsinDB={updateCollectedAnimalsinDB}
//             />
//           )
//         }
//         console.log(provisionalCollectedAnimals)
//         return (<table>{animalsChecklistElements}</table>)
//       }


//     return (
//         <p>Art</p>
//     )
// }

// export default Art;