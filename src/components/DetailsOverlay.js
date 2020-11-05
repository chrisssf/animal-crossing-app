import React, { useState, useEffect, useRef } from 'react'
import './DetailsOverlay.css'

const DetailOverlay = ({item, listType, show, setShowDetailOverlay}) => {

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

        let times = item["availability"]["time"]
        if (item["availability"]["time"] === "") {times = "All Day"}

        const months = [" January", " Feburary", " March", " April", " May", " June", " July", " August", " September", " October", " November", " December"]
        let northernMonths = item["availability"]["month-array-northern"].sort((a, b) => {return a-b}).map(month => months[month - 1])
        let southernMonths = item["availability"]["month-array-southern"].sort((a, b) => {return a-b}).map(month => months[month - 1])

        if (item["availability"]["isAllYear"] === true) {
            northernMonths = ["All Months"]
            southernMonths = ["All Months"]
        }

        return (
            <div id="catching-info">
                <p><b>Times available:</b> {times}</p>
                <p><b>Northern Months available:</b> {northernMonths.join()}</p>
                <p><b>Southern Months available:</b> {southernMonths.join()}</p>
                <p><b>Location:</b> {item["availability"]["location"]}</p>
                <p><b>Rarity:</b> {item["availability"]["rarity"]}</p>
            </div>
        )
    }

    const hasFake =() => {
        return item["hasFake"] ? "Yes" : "No"
    }

    const museumText = () => {
        return listType === "art" ? item["museum-desc"] : item["museum-phrase"]
    }




<a href="#weather-description"></a>
    return (
        <>
            {show &&
                <div className="overlay">
                    <h1 className="overlay-name">{item.name["name-EUen"]}</h1>
                    <img src={item["image_uri"]} className="overlay-image"></img>
                    {listType !== "art" && <p>{item["catch-phrase"]}</p>}
                    {listType !== "art" &&<p><b>Price:</b> {item["price"]}</p>}
                    {listType === "bugs" && <p><b>Flick Price:</b> {item["price-flick"]}</p>}
                    {listType === "fish" && <p><b>CJ Price:</b> {item["price-cj"]}</p>}
                    {listType === "art" && <p><b>Buy Price: </b>{item["buy-price"]}</p>}
                    {listType === "art" && <p><b>Sell Price:</b> {item["sell-price"]}</p>}
                    {listType === "art" && <p><b>Has Fake?: </b>{hasFake()}</p>}
                    <p className="close-overlay" onClick={() => setShowDetailOverlay(false)}>Close</p>
                    {listType !== "art" && <p className="overlay-button" onClick={() => setShowCatchingInfo(!showCatchingInfo)}>{showCatchingInfo ? "Hide" : "Show"} Catching Information</p>}
                    {showCatchingInfo && formatCatchingInfo()}
                    <p className="overlay-button" onClick={() => setShowMuseumText(!showMuseumText)}>{showMuseumText ? "Hide" : "Show"} Museum Text</p>
                    {showMuseumText && <><p>{museumText()}</p></>}
                    <div ref={overlayEnd} />
                </div>
            }
        </>
    )
}

export default DetailOverlay