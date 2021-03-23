import React from 'react'
import "./styles/containerStyle.css"

const Container = (props) =>{
    let classNames = 'custom-container'

    if(props.maxWidth){
        classNames = classNames + `${classNames.length === 0 ? "":" "}custom-container-max-length-${props.maxWidth}`
    }

    return(
        <div className={classNames}>
            {props.children}
        </div>
    )
}
export default Container