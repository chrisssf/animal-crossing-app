import React from 'react'
import { Link } from "react-router-dom";
// import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
// import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigation.css'


const Navigation = () => {


    return (
        <div className="navbar">
            <NavDropdown className="dropdown" title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item href="/bugs">Bugs</NavDropdown.Item>
                <NavDropdown.Item href='/fish'>Fish</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Sign Out</NavDropdown.Item>
            </NavDropdown>
        </div>
    )
}

export default Navigation;
