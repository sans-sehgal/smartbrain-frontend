import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from "./brain.png"
const Logo = ()=>{
    return (
        <div className="ma4 mt0">
            <Tilt  className="Tilt br2 shadow-2" style={{ height: '150px', width: '150px', display: "flex", 
            alignItems: "center", justifyContent: "center", background: "linear-gradient(to bottom, #057296, #6b0dae)"}}>
                <div className="Tilt-inner pa3">
                    <img alt = "Logo" src ={brain}></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo

