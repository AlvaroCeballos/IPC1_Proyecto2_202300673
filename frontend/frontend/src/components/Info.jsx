import React, { useState, useEffect } from "react";
import './Styles/Styles.css'
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from "react-router-dom";
import NavBar from "./NavBar";
import NavBarInfo from "./NavBarInfo";

function Info(){

    
    return(
        <div>
            <NavBarInfo></NavBarInfo>
            <div className="info-background"></div>
            </div>

)
}

export default Info;