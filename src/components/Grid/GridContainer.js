import React from 'react'
import "./styles/gridContainerStyle.css"

function GridContainer(props){
    //for spacing
    let classNames = "custom-gird-container"
    if(props.spacing){
        let spacing = parseInt(props.spacing)
        if(spacing < 1 || spacing > 10){spacing = 1}
        classNames = classNames + `${classNames.length === 0 ? "":" "}custom-grid-spacing-${spacing}`
    }
    return(
        <div className={classNames}>
            {props.children}
        </div>
    )
}
export default GridContainer