import React from 'react';

import './Workplace.css';

const Avatar = (props) => (
  <div className="avatar" onClick={props.handleClick}>
    <span 
      className = "avatar-alt"
      style = {{display: ((props.workers > 0)? "none":"")}}
    >
      可放置
    </span>
    <img 
      src = "https://s1.ax1x.com/2020/08/12/axkB28.png"
      className = "avatar-img"
      style = {{display: ((props.workers > 0)? "":"none")}}
    />
    <span
      className = "num-workers"
      style = {{display: ((props.workers >= 2)? "":"none")}}
    >
      {props.workers}
    </span>
  </div>
);

export const Workplace = (props) => (
  <div className="workplace">
    <Avatar 
      handleClick = {props.handleClick} 
      workers = {props.workers}
    />
    <div className="desc" align="center">
      {props.title}<br/><br/>
      {props.desc}
    </div>
    <div className="illust-container">
      <img 
        src = {props.illust}
        className = "illust"
      />
    </div>
  </div>
);