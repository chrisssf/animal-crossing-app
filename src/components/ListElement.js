import React, {useState} from 'react'
import './ListElement.css'
import DetailsOverlay from './DetailsOverlay'

const ListElement = ({animal, animalCategory, allAnimalsData, provisionalCollectedAnimals, setCollectedAnimals}) => {

    const [showDetailOverlay, setShowDetailOverlay] = useState(false)

    const handleUncheck = (animal, provisionalCollectedAnimals) =>{
        const index = provisionalCollectedAnimals.findIndex((animalId) => animalId === allAnimalsData[animal].id)
        provisionalCollectedAnimals.splice(index, 1)
        setCollectedAnimals(provisionalCollectedAnimals)
      }

      const handleCheck = (animal, provisionalCollectedAnimals) =>{
        provisionalCollectedAnimals.push(allAnimalsData[animal].id)
        setCollectedAnimals(provisionalCollectedAnimals)
      }

    return (
        <>
            <tr>
                {/* <td>{Modal(fishName)}</td> */}
                <td><p onClick={() => setShowDetailOverlay(true)} className="name">{allAnimalsData[animal].name["name-EUen"]}</p></td>
                <td><img src={allAnimalsData[animal]["image_uri"]} className="image"></img></td>
                <td>{provisionalCollectedAnimals.includes(allAnimalsData[animal].id) ? 
                    <div className={animalCategory + "-checkbox"} onClick={() => handleUncheck(animal, provisionalCollectedAnimals)}></div>
                :
                    <div className="empty-checkbox" onClick={() => handleCheck(animal, provisionalCollectedAnimals)}></div>
                }
                </td>
            </tr>

            <DetailsOverlay
                show={showDetailOverlay}
                setShowDetailOverlay={setShowDetailOverlay}
                animal={allAnimalsData[animal]}
                animalCategory={animalCategory}
                // onHide={hideOverlay}
                // name={this.state.dataModal.name}
            />
        </>
    )
}

export default ListElement