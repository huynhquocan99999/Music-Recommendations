import React from 'react';
import "./Dropdown.css";
const Dropdown = props => {    

    const dropdownChanged = e => {
        props.changed(e.target.value);

    }    

    return (
        <div className="dropdown">     
            <label className="dropdown1">{props.label}</label>       
            <select value={props.selectedValue} onChange={dropdownChanged} className="dropdown2">
                <option key={0}>Select...</option>
                {props.options.map((item, idx) => <option key={idx + 1} value={item.id}>{item.name}</option>)}
            </select>            
        </div>
    );
}

export default Dropdown;