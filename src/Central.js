import React from 'react';
import { Workplace } from './Workplace';
import { VCardRow } from './Card';

import './Central.css';

export const Market = (props) => (
  <div className="central market" >
    {props.market.map(workplace => <Workplace {...workplace}/>)}
  </div>
);

export const Field = (props) => (
  <div className="central" >
    <VCardRow cards={props.deck1} />
    <VCardRow cards={props.deck2} />
  </div>
);