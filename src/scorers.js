import React from 'react';
import { food_icons } from './icons';

export const scorers_raw = [
  {requirements:[0], score:1,},
  {requirements:[1,-1], score:2,},
  {requirements:[2], score:2,},
  {requirements:[3,-1], score:3,},
  {requirements:[0,0], score:2,},
  {requirements:[1,1], score:3,},
  {requirements:[2,2], score:4,},
  {requirements:[3,3], score:5,},
  {requirements:[0,1], score:3,},
  {requirements:[1,2], score:4,},
  {requirements:[2,3], score:5,},
  {requirements:[0,3], score:4,},
  {requirements:[0,2], score:3,},
  {requirements:[1,3], score:4,},
  {requirements:[0],  score:2, next: {requirements:[3],score:-3,},},
  {requirements:[1],  score:3, next: {requirements:[0],score:-1,},},
  {requirements:[2],  score:4, next: {requirements:[1],score:-1,},},
  {requirements:[3],  score:5, next: {requirements:[2],score:-2,},},
  {requirements:[0,1,2,3], score:9,},
  {requirements:[-2], score:1,},
  {requirements:[-5], score:3 ,},
];

function get_scorer_desc(scorer) {
  let desc = [];
  for (let r of scorer.requirements) {
    if (r >= 0) {
      desc.push(food_icons[r]);
    }
    else {
      desc.push(`\$${-r}`)
    }
    desc.push(" + ");
  }
  desc = desc.slice(0, desc.length-1);
  desc.push(` = ${scorer.score}分`);

  if (scorer.next) {
    desc = [...desc, <br/>, ...get_scorer_desc(scorer.next).desc];
  }

  scorer.desc = desc;
  return scorer;
}

export const SCORERS = scorers_raw.map(get_scorer_desc);