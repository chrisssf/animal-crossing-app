// alphabetical order please!!!!!!!!!! DONE!!!!!!!!!!!
// capatialize first letter!!!!!!!!!!!
// put in table to center words, images and checkboxes!!!!!!!!!!!

import React, { useState, useEffect } from 'react';

import './Fish.css';


const Fish = () => {

    const [allFishData, setAllFishData] = useState([])
    const [dataRetreived, setDataRetrieved] = useState(false)
    const [collectedFish, setCollectedFish] = useState([])

    useEffect(() =>{
        fetch('http://acnhapi.com/v1/fish')
          .then(res => res.json())
          .then(fish => setAllFishData(fish))
          .then(() => setDataRetrieved(true))
        //   .then(() => console.log("boo", allFishData.bitterling.name["name-EUen"]))
      }, [])

      
      const fishChecklist = () => {
        const fishChecklistElements = []
        const provisionalCollectedFish = collectedFish.concat()

        const allFishDataOrderedAlphabetically = {};
            Object.keys(allFishData).sort().forEach(key => {
                allFishDataOrderedAlphabetically[key] = allFishData[key];
        });


        for (const fish in allFishDataOrderedAlphabetically){
            fishChecklistElements.push(
            <tr>
                <td>{allFishData[fish].name["name-EUen"]}</td>
                <td><img src={allFishData[fish]["image_uri"]} className="fish-image"></img></td>
                <td>{provisionalCollectedFish.includes(allFishData[fish].id) ? 
                    <div className="checkbox" onClick={() => handleUncheck(fish, provisionalCollectedFish)}></div>
                :
                    <div className="empty-checkbox" onClick={() => handleCheck(fish, provisionalCollectedFish)}></div>
                }
                </td>
            </tr>
            )
        }
        return (<table>{fishChecklistElements}</table>)
      }

      const handleUncheck = (fish, provisionalCollectedFish) =>{
        const index = provisionalCollectedFish.findIndex((fishID) => fishID === allFishData[fish].id)
        provisionalCollectedFish.splice(index, 1)
        setCollectedFish(provisionalCollectedFish)
      }

      const handleCheck = (fish, provisionalCollectedFish) =>{
        provisionalCollectedFish.push(allFishData[fish].id)
        setCollectedFish(provisionalCollectedFish)
      }

    return (
        <>
            <h2>Fish page</h2>
            <div className="fish-container">
                {dataRetreived && fishChecklist()}
            </div>
        </>
    )
}

export default Fish