import React from 'react';
import './Panel.css';

export const Panel = (props) => (
  <div className="panel" align="center">
    {props.data}
  </div>
);