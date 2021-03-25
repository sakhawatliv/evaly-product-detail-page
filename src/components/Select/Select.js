import React from 'react'
import "./styles/selectStyles.css"

function Select(props){
    const {options = [],label=""} = props

    return(
        <div className="select-wrapper">
            <div className="select-label">
                <label>{label}</label>
            </div>
            <div>
                <select className={"select"} name={label} id={`select-${label}`} value={props.value} onChange={props.onChange}>
                    {options.map((option,index) =>(
                        <option key={index} value={option.key}>{option.value}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
export default Select