import React, { useState, useEffect } from 'react';
import ListElement from '../components/ListElement.js';
import Navigation from '../components/Navigation.js'

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import db from '../FirebaseConfig';

import './Animal.css';



const Animal = ({ animalCategory, userId }) => {

  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     // User is signed in.
  //     var displayName = user.displayName;
  //     var email = user.email;
  //     var emailVerified = user.emailVerified;
  //     var photoURL = user.photoURL;
  //     var isAnonymous = user.isAnonymous;
  //     var uid = setUserIDDD(user.uid);
  //     var providerData = user.providerData;
  //     // ...
  //   } else {
  //     // User is signed out.
  //     // ...
  //   }
  // });
  
    const [allAnimalsData, setAllAnimalsData] = useState([])
    const [dataRetreived, setDataRetrieved] = useState(false)
    const [collectedAnimals, setCollectedAnimals] = useState([])

    useEffect(() =>{
        fetch('http://acnhapi.com/v1/' + animalCategory)
          .then(res => res.json())
          .then(animals => setAllAnimalsData(animals))
          .then(() => getAnimalsCollectedFromDatabase())
          .then(() => setDataRetrieved(true))
 
        // getAnimalsCollectedFromDatabase()
      }, [])

      const updateCollectedAnimalsinDB = (changeThisCollectedAniamls) => {
        let databaseField = ""
      
        if(animalCategory === "bugs") {
          databaseField = "bugs_checked"
        } else if ( animalCategory === "fish"){
          databaseField = "fish_checked"
        }
        
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            const userRef = db.collection("users").doc(user.uid)
            return userRef.update({[databaseField]: changeThisCollectedAniamls})
            // make this animalCategory not bugs!!!!!!!!!!!!!
            .catch(error => console.log(error))
          }
        })
      }

      const getAnimalsCollectedFromDatabase = async () => {
        let databaseField = ""
      
        if(animalCategory === "bugs") {
          databaseField = "bugs_checked"
        } else if ( animalCategory === "fish"){
          databaseField = "fish_checked"
        }
        
        firebase.auth().onAuthStateChanged( async (user) => {
          if (user) {
            const userRef = db.collection("users").doc(user.uid)
            const doc = await userRef.get()
            if(!doc.exists){
              console.log("No such document")
            } else {
              console.log("here")
              setCollectedAnimals(doc.data()[databaseField])
              // THIS NEEDS CHANGED TO animalCategory!!!!!!!!!!!!!!!!!--------------
            }
          }
        })
      }

      const animalsChecklist = () => {
        const animalsChecklistElements = []
        const provisionalCollectedAnimals = collectedAnimals.concat()

        const allAnimalsDataOrderedAlphabetically = {};
            Object.keys(allAnimalsData).sort().forEach(key => {
                allAnimalsDataOrderedAlphabetically[key] = allAnimalsData[key];
        });


        for (const animal in allAnimalsDataOrderedAlphabetically){
            animalsChecklistElements.push(
              <ListElement 
                animal={animal} 
                animalCategory={animalCategory} 
                allAnimalsData={allAnimalsData} 
                provisionalCollectedAnimals={provisionalCollectedAnimals} 
                setCollectedAnimals={setCollectedAnimals}
                updateCollectedAnimalsinDB={updateCollectedAnimalsinDB}
              />
            )
        }
        console.log(provisionalCollectedAnimals)
        return (<table>{animalsChecklistElements}</table>)
      }

    return (
      <div className="animal-container">
        <div className="header">
          <Navigation />
          <h2 className="animal-title">{animalCategory}</h2>
        </div>
        <div className={animalCategory + "-container"}>
        <p>Homepage/register/login <br/> Heroku<br/>Firebase!!!</p>
            {dataRetreived && animalsChecklist()}
        </div>
      </div>
    )
}

export default Animal