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
            const fishName = allFishData[fish].name["name-EUen"].toString()
            console.log(fishName)
            fishChecklistElements.push(
            <tr>
                 {/* <td>{Modal(fishName)}</td> */}
                {/* <td><p onClick={() => Modal()} className="fish-name">{allFishData[fish].name["name-EUen"]}</p></td> */}
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



// const Modal = (fish) => (
//   <Popup
//     trigger={<p className="fish-name"> {fish} </p>}
//     modal
//     nested
//   >
//     {/* <Popup
//         trigger={<p className="fish-name"> {allFishData[fish].name["name-EUen"]} </p>}
//         modal
//         nested
//     > */}
//     {/* {console.log("fish", fish)} */}
//     {close => (
//       <div className="modal">
//         <button className="close" onClick={close}>
//           &times;
//         </button>
//         <div className="header"> Modal Title </div>
//         <div className="content">
//           {' '}
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
//           Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
//           delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
//           <br />
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
//           commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
//           explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
//         </div>
//         <div className="actions">
//           <Popup
//             trigger={<button className="button"> Trigger </button>}
//             position="top center"
//             nested
//           >
//             <span>
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
//               magni omnis delectus nemo, maxime molestiae dolorem numquam
//               mollitia, voluptate ea, accusamus excepturi deleniti ratione
//               sapiente! Laudantium, aperiam doloribus. Odit, aut.
//             </span>
//           </Popup>
//           <button
//             className="button"
//             onClick={() => {
//               console.log('modal closed ');
//               close();
//             }}
//           >
//             close modal
//           </button>
//         </div>
//       </div>
//     )}
//   </Popup>
// )

    return (
        <>
            <h2>Fish page</h2>
            {/* {Modal()} */}
            <div className="fish-container">
                {dataRetreived && fishChecklist()}
            </div>
        </>
    )
}

export default Fish