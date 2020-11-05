import React, { useState } from 'react'
import './ListElement.css'
import DetailsOverlay from './DetailsOverlay'

const ListElement = ({ item, listType, apiData, provisionalCheckedItems, setCheckedItems, updateCheckedItemsInDatabase }) => {

    const [showDetailOverlay, setShowDetailOverlay] = useState(false)

    const handleUncheck = (item, provisionalCheckedItems) =>{
        const index = provisionalCheckedItems.findIndex((animalId) => animalId === apiData[item].id)
        provisionalCheckedItems.splice(index, 1)
        setCheckedItems(provisionalCheckedItems)
        updateCheckedItemsInDatabase(provisionalCheckedItems)
      }

      const handleCheck = (item, provisionalCheckedItems) =>{
        provisionalCheckedItems.push(apiData[item].id)
        setCheckedItems(provisionalCheckedItems)
        updateCheckedItemsInDatabase(provisionalCheckedItems)
      }

    return (
        <>
            <tr>
                {/* <td>{Modal(fishName)}</td> */}
                <td><p onClick={() => setShowDetailOverlay(true)} className="name">{apiData[item].name["name-EUen"]}</p></td>
                <td><img src={apiData[item]["image_uri"]} className="list-image"></img></td>
                <td>{provisionalCheckedItems.includes(apiData[item].id) ? 
                    <div className={listType + "-checkbox"} onClick={() => handleUncheck(item, provisionalCheckedItems)}></div>
                :
                    <div className="empty-checkbox" onClick={() => handleCheck(item, provisionalCheckedItems)}></div>
                }
                </td>
            </tr>
            {console.log("listType", listType)}
            <DetailsOverlay
                show={showDetailOverlay}
                setShowDetailOverlay={setShowDetailOverlay}
                item={apiData[item]}
                listType={listType}
                // onHide={hideOverlay}
                // name={this.state.dataModal.name}
            />
        </>
    )
}

export default ListElement