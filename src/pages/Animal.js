import React, { useState, useEffect } from 'react';
import ListElement from '../components/ListElement';

import './Animal.css';


const Animal = ({animalCategory}) => {

    const [allAnimalsData, setAllAnimalsData] = useState([])
    const [dataRetreived, setDataRetrieved] = useState(false)
    const [collectedAnimals, setCollectedAnimals] = useState([])

    useEffect(() =>{
        fetch('http://acnhapi.com/v1/' + animalCategory)
          .then(res => res.json())
          .then(animals => setAllAnimalsData(animals))
          .then(() => setDataRetrieved(true))
        //   .then(() => console.log("boo", allFishData.bitterling.name["name-EUen"]))

        // console.log("animalCategory", animalCategory)
      }, [])

      
      const animalsChecklist = () => {
        const animalsChecklistElements = []
        const provisionalCollectedAnimals = collectedAnimals.concat()

        const allAnimalsDataOrderedAlphabetically = {};
            Object.keys(allAnimalsData).sort().forEach(key => {
                allAnimalsDataOrderedAlphabetically[key] = allAnimalsData[key];
        });


        for (const animal in allAnimalsDataOrderedAlphabetically){
            // const bugName = allBugshData[bug].name["name-EUen"].toString()
            // console.log(bugName)
            animalsChecklistElements.push(
              <ListElement 
                animal={animal} 
                animalCategory={animalCategory} 
                allAnimalsData={allAnimalsData} 
                provisionalCollectedAnimals={provisionalCollectedAnimals} 
                setCollectedAnimals={setCollectedAnimals}
              />
            )
        }
        return (<table>{animalsChecklistElements}</table>)
      }

    return (
      <div className="animal-container">
        <h2 className="animal-title">{animalCategory}</h2>
        <div className={animalCategory + "-container"}>
        <p>Homepage/register/login <br/> Heroku<br/>Firebase!!!</p>
            {dataRetreived && animalsChecklist()}
        </div>
      </div>
    )
}

export default Animal