import React from "react";
import "./ImageLinkForm.css"
const ImageLinkForm = ({onInputChange, onButtonSubmit})=>{
    return (
        <div>
            <p className="f3">This Web App helps detect faces of users in pictures! Give it a try.</p>
            <div style={{display:"flex", justifyContent: "center"}}>
                <div className="ma4 pa4 br3 shadow-5 form center">
                    <input type="text" className="f4 pa2 w-70" onChange={onInputChange}/>
                    <button className="f4 pa2 grow link ph3 pv2 dib white bg-light-purple pointer" onClick={onButtonSubmit}> Detect! </button>
                </div>
            </div>
        </div>
    )
    
}

export default ImageLinkForm