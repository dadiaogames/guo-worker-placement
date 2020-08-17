import React from 'react';
import { food_icons } from './icons';

export const MARKET = [
  {
    title: <span>{food_icons[0]}迷hotel</span>,
    cost: 0,
    food_type: 0,
    illust: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597244405843&di=661d6e6add618fbeb6a529c1dede9e86&imgtype=0&src=http%3A%2F%2Fxs3.op.xywy.com%2Fapi.iu1.xywy.com%2Fcms%2F20170420%2F25751936b78f17285f47411819a413f835689.png",
    effect(G, ctx) {
      G.foods[0] += 1;
      G.money += 1;
      for (let skill of G.skills) {
        if (skill.onGet0) {
          skill.onGet0(G, ctx); // EH: reconstruct this to Game, if there's a food type, onGet${food_type}
        }
      }
    }
  },
  {
    title: <span>{food_icons[1]}蓝莓</span>,
    cost: 0,
    food_type: 1,
    illust: "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1071612663,2479903029&fm=26&gp=0.jpg",
    effect(G, ctx) {
      G.foods[1] += 1;
      for (let skill of G.skills) {
        if (skill.onGet1) {
          skill.onGet1(G, ctx);
        }
      }
    }
  },
  {
    title: <span>{food_icons[2]}新居</span>,
    cost: 1,
    food_type: 2,
    illust: "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1121089958,3018372729&fm=26&gp=0.jpg",
    effect(G, ctx) {
      G.foods[2] += 1;
      for (let skill of G.skills) {
        if (skill.onGet2) {
          skill.onGet2(G, ctx);
        }
      }
    }
  },
  {
    title: <span>{food_icons[3]}红心火龙果</span>,
    cost: 0,
    food_cost: 0,
    food_type: 3,
    illust: "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3576916985,1409439418&fm=26&gp=0.jpg",
    effect(G, ctx) {
      G.foods[3] += 1;
      for (let skill of G.skills) {
        if (skill.onGet3) {
          skill.onGet3(G, ctx);
        }
      }
    }
  },
  {
    title: <span>{food_icons[3]}红心火龙果</span>,
    cost: 0,
    food_cost: 1,
    food_type: 3,
    illust: "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3576916985,1409439418&fm=26&gp=0.jpg",
    effect(G, ctx) {
      G.foods[3] += 1;
      for (let skill of G.skills) {
        if (skill.onGet3) {
          skill.onGet3(G, ctx);
        }
      }
    }
  }, 
  {
    title: <span>获得$3</span>,
    cost: 0,
    illust: "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3216805947,683070568&fm=26&gp=0.jpg",
    effect(G, ctx) {
      G.money += 3;
    }
  },
  {
    title: <span>拿1张发展卡(双击拿取)</span>,
    cost: 0,
    illust: "https://s1.ax1x.com/2020/08/13/axTt8P.png",
    effect(G, ctx) {
      G.picks += 1;
    }
  },
 
];