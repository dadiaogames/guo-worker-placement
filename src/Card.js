import React from 'react';

import './Card.css';

// Maybe all styles should be processed in container, not at here
// Or some styles are fixed, so let props be at higher level?
export const Card = (props) => {
  let border = "3px solid";

  if (props.cardType == "scorer") {
    border = "3px solid rgb(229,131,8)";
  }
  else if (props.cardType == "skill") {
    border = "3px solid rgb(137,207,240)";
  }

  if (props.selected) {
    border = "4px solid green";
  }

  if (props.exhausted) {
    border = "2px solid red";
  }

  // EH: Let cost float like data
  return (<div 
    className = "card" 
    style = {{
      border: border,
    }}
    onClick = {props.handleClick}
    align = "center"
  >
    {props.cost? `(\$${props.cost})` : ""}
    <br/>
    {props.desc}
  </div>);
};

export const VCardRow = (props) => (<div className="vcard-row" >
  {props.cards.map((card, idx) => (
    <Card
      {...card}
    />
  ))}
</div>);
