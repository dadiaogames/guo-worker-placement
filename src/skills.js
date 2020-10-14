import React from 'react';
import { pay, pay_food } from './Game';
import { food_icons, guo_icon } from './icons';

export const SKILLS = [
  {desc: <span>拿取{food_icons[0]}时，额外获得1{food_icons[0]}</span>,
  cost: 1,
  onGet0(G, ctx) {
    G.foods[0] += 1;
  },},
  {desc: <span>拿取{food_icons[1]}时，额外获得1{food_icons[1]}</span>,
  cost: 1,
  onGet1(G, ctx) {
    G.foods[1] += 1;
  },},
  {desc: <span>拿取{food_icons[2]}时，价格-2$</span>,
  cost: 1,
  battlecry: true,
  onTurnBegin(G, ctx) {
    for (let workplace of G.market) {
      if (workplace.food_type == 2) {
        workplace.cost -= 2;
      }
    }
  },},
  {desc: <span>拿取{food_icons[3]}时，无需支付食材</span>,
  cost: 2,
  battlecry: true,
  onTurnBegin(G, ctx) {
    for (let workplace of G.market) {
      if (workplace.food_type == 3) {
        workplace.food_cost = -1;
      }
    }
  },},
  {desc: <span>拿取{food_icons[0]}时，获得$2</span>,
  cost: 1,
  onGet0(G, ctx) {
    G.money += 2;
  },},
  {desc: <span>拿取{food_icons[1]}时，获得$2</span>,
  cost: 1,
  onGet1(G, ctx) {
    G.money += 2;
  },},
  {desc: <span>拿取{food_icons[2]}时，获得{guo_icon}</span>,
  cost: 1,
  onGet2(G, ctx) {
    G.workers += 1;
  },},
  {desc: <span>拿取{food_icons[3]}时，可拿取1张发展卡</span>,
  cost: 4,
  onGet3(G, ctx) {
    G.picks += 1;
  },},
  {desc: <span>行动: $2→{food_icons[0]}+{food_icons[0]}</span>,
  cost: 1,
  action(G, ctx) {
    if (pay(G, ctx, 2)) {
      G.foods[0] += 2;
    }
  },},
  {desc: <span>行动: $1→{food_icons[1]}</span>,
  cost: 1,
  action(G, ctx) {
    if (pay(G, ctx, 1)) {
      G.foods[1] += 1;
    }
  },},
  {desc: <span>行动: $2→{food_icons[2]}</span>,
  cost: 1,
  action(G, ctx) {
    if (pay(G, ctx, 2)) {
      G.foods[2] += 1;
    }
  },},
  {desc: <span>行动: $3→{food_icons[3]}</span>,
  cost: 1,
  action(G, ctx) {
    if (pay(G, ctx, 3)) {
      G.foods[3] += 1;
    }
  },},
  {desc: <span>行动: {food_icons[0]}→$4</span>,
  cost: 1,
  action(G, ctx) {
    if (pay_food(G, ctx, 0)) {
      G.money += 4;
    }
  },},
  {desc: <span>行动: {food_icons[1]}→$5</span>,
  cost: 1,
  action(G, ctx) {
    if (pay_food(G, ctx, 1)) {
      G.money += 5;
    }

  },},
  {desc: <span>行动: {food_icons[2]}→$6</span>,
  cost: 1,
  action(G, ctx) {
    if (pay_food(G, ctx, 2)) {
      G.money += 6;
    }

  },},
  {desc: <span>行动: {food_icons[3]}→$7</span>,
  cost: 1,
  action(G, ctx) {
    if (pay_food(G, ctx, 3)) {
      G.money += 7;
    }

  },},
  {desc: <span>回合开始时，获得1{food_icons[0]}</span>,
  cost: 1,
  onTurnBegin(G, ctx) {
    G.foods[0] += 1;

  },},
  {desc: <span>回合开始时，获得1{food_icons[1]}</span>,
  cost: 4,
  onTurnBegin(G, ctx) {
    G.foods[1] += 1;

  },},
  {desc: <span>回合开始时，获得1{food_icons[2]}</span>,
  cost: 8,
  onTurnBegin(G, ctx) {
    G.foods[2] += 1;

  },},
  {desc: <span>回合开始时，消耗$2，获得1{food_icons[3]}</span>,
  cost: 4,
  onTurnBegin(G, ctx) {
    if (pay(G, ctx, 2)) {
      G.foods[3] += 1;
    }
  },},
  {desc: <span>回合开始时，获得$2</span>,
  cost: 1,
  onTurnBegin(G, ctx) {
    G.money += 2;
  },},

  {
    desc: <span>行动: 重置1张技能卡</span>,
    cost: 1,
    action(G, ctx, self) {
      let exhausted_skills = G.skills.filter(x => (x.exhausted && x!=self));
      let skill = ctx.random.Shuffle(exhausted_skills)[0];
      if (skill) {
        skill.exhausted = false;
      }
    },
  },
  
  {
    desc: <span>行动: 获得{guo_icon}</span>,
    cost: 1,
    action(G, ctx, self) {
      G.workers += 1;
    },
  },

  {
    desc: <span>行动: $1→拿1张发展卡</span>,
    cost: 1,
    action(G, ctx, self) {
      if (pay(G, ctx, 1)) {
        G.picks += 1;
      }
    },
  },
];