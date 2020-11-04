import React, { useState, useEffect, useRef } from 'react'
import './DetailsOverlay.css'

const DetailOverlay = ({animal, animalCategory, show, setShowDetailOverlay}) => {

    const [showMuseumText, setShowMuseumText] = useState(false)
    const [showCatchingInfo, setShowCatchingInfo] = useState(false)

    const overlayEnd = useRef(null);

    useEffect(() => {
        if(showMuseumText === true){
            overlayEnd.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [showMuseumText])

    useEffect(() => {
        if(showCatchingInfo === true){
            overlayEnd.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [showCatchingInfo])


    const formatCatchingInfo = () => {

        let times = animal["availability"]["time"]
        if (animal["availability"]["time"] === "") {times = "All Day"}

        const months = [" January", " Feburary", " March", " April", " May", " June", " July", " August", " September", " October", " November", " December"]
        let northernMonths = animal["availability"]["month-array-northern"].sort((a, b) => {return a-b}).map(month => months[month - 1])
        let southernMonths = animal["availability"]["month-array-southern"].sort((a, b) => {return a-b}).map(month => months[month - 1])

        if (animal["availability"]["isAllYear"] === true) {
            northernMonths = ["All Months"]
            southernMonths = ["All Months"]
        }

        return (
            <div id="catching-info">
                <p><b>Times available:</b> {times}</p>
                <p><b>Northern Months available:</b> {northernMonths.join()}</p>
                <p><b>Southern Months available:</b> {southernMonths.join()}</p>
                <p><b>Location:</b> {animal["availability"]["location"]}</p>
                <p><b>Rarity:</b> {animal["availability"]["rarity"]}</p>
            </div>
        )
    }

<a href="#weather-description"></a>
    return (
        <>
            {show &&
                <div className="overlay">
                    <h1 className="overlay-name">{animal.name["name-EUen"]}</h1>
                    <img src={animal["image_uri"]} className="overlay-image"></img>
                    <p>{animal["catch-phrase"]}</p>
                    <p><b>Price:</b> {animal["price"]}</p>
                    {animalCategory === "bugs" && <p><b>Flick Price:</b> {animal["price-flick"]}</p>}
                    {animalCategory === "fish" && <p><b>CJ Price:</b> {animal["price-cj"]}</p>}
                    <p className="close-overlay" onClick={() => setShowDetailOverlay(false)}>Close</p>
                    <p className="overlay-button" onClick={() => setShowCatchingInfo(!showCatchingInfo)}>{showCatchingInfo ? "Hide" : "Show"} Catching Information</p>
                    {showCatchingInfo && formatCatchingInfo()}
                    <p className="overlay-button" onClick={() => setShowMuseumText(!showMuseumText)}>{showMuseumText ? "Hide" : "Show"} Museum Text</p>
                    {showMuseumText && <><p>{animal["museum-phrase"]}</p></>}
                    <div ref={overlayEnd} />
                </div>
            }
        </>
    )
}

export default DetailOverlay