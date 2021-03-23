import React from 'react'
import "./styles/gridItemStyle.css"

const GridItem = (props) =>{
    let classNames = ""
    if(props.xs){
        classNames = classNames + `${classNames.length === 0 ? "":" "}custom-grid-xs-${props.xs}`
    }
    if(props.sm){
        classNames = classNames + `${classNames.length === 0 ? "":" "}custom-grid-sm-${props.sm}`
    }
    if(props.md){
        classNames = classNames + `${classNames.length === 0 ? "":" "}custom-grid-md-${props.md}`
    }
    if(props.lg){
        classNames = classNames + `${classNames.length === 0 ? "":" "}custom-grid-lg-${props.lg}`
    }
    // for spacing
    if(props.spacing){
        let spacing = parseInt(props.spacing)
        if(spacing < 1 || spacing > 10){spacing = 1}
        classNames = classNames + `${classNames.length === 0 ? "":" "}custom-grid-item-spacing-${spacing}`
    }
    return(
        <div className={classNames}>
            {props.children}
        </div>
    )
}
export default GridItem