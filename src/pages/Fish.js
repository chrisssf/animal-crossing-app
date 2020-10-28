import React, { useState, useEffect } from 'react';

import './Fish.css';


const Fish = () => {

    const [allFishData, setAllFishData] = useState([])
    const [dataRetreived, setDataRetrieved] = useState(false)

    useEffect(() =>{
        fetch('http://acnhapi.com/v1/fish')
          .then(res => res.json())
          .then(fish => setAllFishData(fish))
          .then(() => setDataRetrieved(true))
        //   .then(() => console.log("boo", allFishData.bitterling.name["name-EUen"]))
      }, [])

      const fishChecklist = () => {
        //   console.log("allFishData", allFishData)
        const fishChecklistElements = []
          for (const fish in allFishData){
            //   console.log(allFishData[fish].name[name-EUen])
            fishChecklistElements.push(
                <div className="checklist-container">
                    <h3>{allFishData[fish].name["name-EUen"]}</h3>
                    <div className="checkbox" onClick={() => console.log("clicked")}></div>
                </div>
            )
          }
        //   console.log(fishChecklistElements)
          return fishChecklistElements
      }

    return (
        <>
            <h2>Fish page</h2>
            <input type="checkbox"/>
            <div className="checkbox" onClick={() => console.log("clicked")}></div>
            {dataRetreived && fishChecklist()}
            {/* {console.log(allFishData)} */}
        </>
    )
}

export default Fish