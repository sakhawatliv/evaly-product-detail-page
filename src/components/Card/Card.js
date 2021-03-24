import React from 'react'
import "./styles/cardStyles.css"

function Card(props){
    return(
        <div className="custom-card">
            {props.children}
        </div>
    )
}
export default Card