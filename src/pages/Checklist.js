import React, { useState, useEffect } from 'react';
import ListElement from '../components/ListElement.js';
import Navigation from '../components/Navigation.js'

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import db from '../FirebaseConfig';

import './Checklist.css';

// animalCategory = listType
// allAnimalsData = apiData
// dataRetreived = apiDataRetreived
// collectedAnimals = checkedItems

// getAnimalsCollectedFromDatabase() = getCheckedItemsFromDatabase()
// updateCollectedAnimalsinDB() = updateCheckedItemsInDatabase()
// animalsChecklist() = populateChecklist()





const Checklist = ({ listType }) => {


  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     // User is signed in.
  //     var displayName = user.displayName;
  //     var email = user.email;
  //     var emailVerified = user.emailVerified;
  //     var photoURL = user.photoURL;
  //     var isAnonymous = user.isAnonymous;
  //     var uid = user.uid;
  //     var providerData = user.providerData;
  //     // ...
  //   } else {
  //     // User is signed out.
  //     // ...
  //   }
  // });
  
  const [ apiData, setApiData] = useState([])
  const [ apiDataRetreived, setApiDataRetrieved] = useState(false)
  const [ checkedItems, setCheckedItems] = useState([])
  const [ currentUser, setCurrentUser ] = useState("")

  useEffect(() =>{
    fetch('https://acnhapi.com/v1/' + listType)
      .then(res => res.json())
      .then(data => setApiData(data))
      .then(() => getCheckedItemsFromDatabase())
      .then(() => getUser())
      .then(() => setApiDataRetrieved(true))

    // getAnimalsCollectedFromDatabase()
  }, [])

  const updateCheckedItemsInDatabase = (checkedItemsForDB) => {
    let databaseField = ""
  
    if(listType === "bugs") {
        databaseField = "bugs_checked"
    } else if ( listType === "fish"){
        databaseField = "fish_checked"
    } else if( listType === "art") {
        databaseField = "art_checked"
    }
        
      // firebase.auth().onAuthStateChanged((user) => {
      //   if (user) {
      //     const userRef = db.collection("users").doc(user.uid)
      //     return userRef.update({[databaseField]: checkedItemsForDB})
      //     .catch(error => console.log(error))
      //   }
      // })
      const userRef = db.collection("users").doc(currentUser.uid)
      return userRef.update({[databaseField]: checkedItemsForDB})
      .catch(error => console.log(error))
  }

  const getCheckedItemsFromDatabase = async () => {
    let databaseField = ""
  
    if(listType === "bugs") {
        databaseField = "bugs_checked"
    } else if ( listType === "fish"){
        databaseField = "fish_checked"
    } else if( listType === "art") {
        databaseField = "art_checked"
    }
    
    firebase.auth().onAuthStateChanged( async (user) => {
      if (user) {
        const userRef = db.collection("users").doc(user.uid)
        const doc = await userRef.get()
        if(!doc.exists){
          console.log("No such document")
        } else {
          console.log("here")
          setCheckedItems(doc.data()[databaseField])
        }
      }
    })
  }

  const getUser = () => {
    firebase.auth().onAuthStateChanged( async (user) => {
      if (user) {
        console.log(user)
        setCurrentUser(user)
      } else {
        setCurrentUser({})
      }
    })
    console.log("currentUser", currentUser)
  }

  const populateChecklist = () => {
    const checklistElements = []
    const provisionalCheckedItems = checkedItems.concat()

    const allApiDataOrderedAlphabetically = {};
    Object.keys(apiData).sort().forEach(key => {
        allApiDataOrderedAlphabetically[key] = apiData[key];
    });


    for (const item in allApiDataOrderedAlphabetically){
        checklistElements.push(
        <ListElement 
          item={item} 
          listType={listType} 
          apiData={apiData} 
          provisionalCheckedItems={provisionalCheckedItems} 
          setCheckedItems={setCheckedItems}
          updateCheckedItemsInDatabase={updateCheckedItemsInDatabase}
        />
      )
    }
    // console.log(provisionalCollectedAnimals)
    return (<table>{checklistElements}</table>)
  }

  const showTotalChecked = () => {
    return (
      <p className="checklist-text"><b>Collected: {checkedItems.length} / {Object.keys(apiData).length} </b></p>
    )
  }

  return (
    <div className="item-container">
        <div className="header">
            <Navigation />
            <h2 className="item-title">{listType}</h2>
            {currentUser.email && <p className="signed-in-as">Signed in as <br/>{currentUser.email}</p>}
        </div>
        <div className={listType + "-container"}>
            <p className="checklist-text">Click on a name to get more information about that item!</p>
            {apiDataRetreived && showTotalChecked()}
            {apiDataRetreived && populateChecklist()}
        </div>
    </div>
  )
}

export default Checklist