import React from "react";

const Navigation = ({isSignedIn, onRouteChange}) => {
    if (isSignedIn === true){
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className="f3 link dim pa3 white pointer no-underline" onClick={() => onRouteChange('signin')}>Sign Out</p>
            </nav>
        )
    }
    else if (isSignedIn === false){
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className="f3 link dim pa3 white pointer no-underline" onClick={() => onRouteChange('signin')}>Sign In</p>
            </nav>
        )
    }
        
}

export default Navigation