import React from 'react'
import "./styles/cardStyles.css"

function CardBody(props){
    return(
        <div className="card-body-wrapper">
            {props.children}
        </div>
    )
}
export default CardBody