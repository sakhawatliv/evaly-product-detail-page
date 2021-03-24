import React from 'react'
import "./styles/paperStyles.css"

function Paper(props){
    let {color = "white",border = ""} = props
    let classNames = "paper"

    if(props.color === "off-white"){
        classNames = classNames + `${classNames.length === 0 ? "":" "}off-white-paper`
    }else{
        classNames = classNames + `${classNames.length === 0 ? "":" "}white-paper`
    }

    if(props.ps === "1"){
        classNames = classNames + `${classNames.length === 0 ? "":" "}ps-1`
    }else{
        classNames = classNames + `${classNames.length === 0 ? "":" "}ps-0`
    }

    if(border === "br-left"){
        classNames = classNames + `${classNames.length === 0 ? "":" "}br-left`
    } 
    if(border === "br-all-10"){
        classNames = classNames + `${classNames.length === 0 ? "":" "}br-all-10`
    }
    
    return(
        <div className={classNames}>
            {props.children}
        </div>
    )
}
export default Paper