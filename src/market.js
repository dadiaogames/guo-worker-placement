import React from 'react';
import { food_icons } from './icons';
export const RULES = `游戏目标: 在7天内获得尽可能多的分数
在你的回合，可以放置郭老师，并做以下事情:
* 拿取食物: 支付食物价格并拿取1个相应食物，拿取"红心火龙果"时需要支付1个食物(猕猴桃或蓝莓)
* 拿取发展卡: 技能卡和得分卡统称为发展卡，双击想要拿取的发展卡以获得之，拿取技能卡时，需要支付其费用
放置郭老师时，如果该位置上已经有郭老师，则需要花2块钱/每个郭老师才能再次放置
7天结束后进入算分，最终得分仅和拥有的得分卡有关
策略提示:
* 食物的价格每回合都会变，如果当前觉得太贵，可以之后再买
* 得分卡的效果是叠加的，所以当你对某种食物的获取能力很强时，要多拿该食物的得分卡
* 权衡好得分卡和食物的数量是得高分的关键，得分卡过少会导致分数不够，得分卡过多会导致食物不够
* 游戏开始时，有2次免费拿取发展卡的机会(拿取技能卡时仍要支付费用)`;

export const MARKET = [ 
  {
    title: <span>拿1张发展卡</span>,
    cost: 0,
    illust: "https://s1.ax1x.com/2020/08/13/axTt8P.png",
    effect(G, ctx) {
      G.picks += 1;
    }
  },
  {
    title: <span>{food_icons[0]}迷hotel</span>,
    cost: -1,
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
    cost: 1,
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
    title: <span>玩法教学</span>,
    cost: 0,
    illust: "https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=3629808948,78649414&fm=74&app=80&f=JPEG&size=f121,140?sec=1880279984&t=ae4e8d4cabd5bfd5a0de0ed5b219a9cc",
    effect(G, ctx) {
      alert(RULES);
      G.workers += 1;
    }
  },
 
];