import React from 'react'
import "./styles/buttonStyles.css"

function Button(props){
    return(
        <div>
            <button className="custom-button-v1" onClick={props.onClick}>
                {props.btnText}
            </button>
        </div>
    )
}
export default Button