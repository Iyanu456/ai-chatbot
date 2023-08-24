import React from 'react';
import Icon from "./form_components/Icon"

function AsideItem(props) {
    var icon = props.icon
    return (
        <div 
        className={props.className} 
        style={{
            width: "95%",
            height: "fit-content",
            display: "flex",
            flexWrap: "nowrap",
            gap: "0.6em",
            fontFamily: "Nunito Sans",
            fontSize: "0.85em",
            borderRadius: "10px",
        }}>
        {icon != null && 
            <Icon 
                icon={props.icon}
                style={{height: "35px", width: "35px"}}
            />}
            <p style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{props.content}</p>
        </div>
    )
}

export default AsideItem;
