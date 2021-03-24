import React from 'react'
import "./styles/cardStyles.css"

function CardImage(props){
    return(
        <div className="card-image">
            <img  src={props.src}/>
        </div>
    )
}
export default CardImage