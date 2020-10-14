import React from 'react';
import { food_icons } from './icons';
import { MARKET } from './market';
import { SKILLS } from './skills';
import { SCORERS } from './scorers';

export function move(G, ctx, d1, d2, idx) {
  let cd_idx = idx || 0;
  let card = G[d1].splice(cd_idx, 1)[0];
  G[d2].push(card);
  return card;
}

function init_prices() {
  let prices = [];
  for(let i=0; i<4; i++) {
    prices.push([i, i+1, i+2, i+3].map(i => i%4));
  }
  return [...prices, ...prices.map(p => p.reverse())];
}

function setup(ctx) {
  const G = {};

  G.foods = [0, 0, 0, 0];
  G.money = 3;
  G.workers = 3;

  G.day = 0;

  G.scorer_deck = [...SCORERS, ...SCORERS];
  G.skill_deck = [...SKILLS, ...SKILLS];
  G.scorer_deck = ctx.random.Shuffle(G.scorer_deck);
  G.skill_deck = ctx.random.Shuffle(G.skill_deck);

  G.scorer_list = [];
  G.skill_list = [];
  G.scorers = [ctx.random.Shuffle(SCORERS)[0]];
  G.skills = [];

  G.market = []; // This is not set in setup

  G.prices = ctx.random.Shuffle(init_prices());

  G.picks = 1;

  return G;
}

function shuffle_decks(G, ctx, times) {
  for (let i=0; i<times; i++) {
    G.scorer_deck = ctx.random.Shuffle(G.scorer_deck);
    G.skill_deck = ctx.random.Shuffle(G.skill_deck);
    G.prices = ctx.random.Shuffle(G.prices);
    G.scorers = [ctx.random.Shuffle(SCORERS)[0]];
  }
  // EH: reconstruct this part
  // If a shuffle function is at the outside, then the "onBegin" of the turn should be changed by adding stages
  // However, if game is jumped into via "start_game", this is not a problem, if game is jumped into right after the page is loaded, this is a problem
  G.day -= 1;
  G.money -= 2;
  ctx.events.endTurn();
}

export function pay(G, ctx, amount) {
  if (G.money >= amount) {
    G.money -= amount;
    return true;
  }
  else {
    return false
  }
}

function use_worker(G, ctx, workplace) {
  if (G.workers > 0) {
    G.workers -= 1;
    workplace.workers += 1;
    return true;
  }
  else {
    return false;
  }
}

export function pay_food(G, ctx, food) {
  // Usually, only cost 1 food
  if (G.foods[food] > 0) {
    G.foods[food] -= 1;
    return true;
  }
  else {
    return false;
  }
}

function place(G, ctx, idx) {
  let workplace = G.market[idx];

  let total_cost = workplace.cost + 2 * workplace.workers;
  if (use_worker(G, ctx, workplace) && pay(G, ctx, total_cost)) {
    if (workplace.food_cost >= 0) {
      let food_paid = pay_food(G, ctx, workplace.food_cost);
      if (!food_paid) {
        return;
      }
    }

    workplace.effect(G, ctx);
  }
}

export function get_score(scorer, resources) {
  let calc = [...resources];
  // The scorer.requirements and resources cannot be empty, and r cannot be larger than the len of calc or return values after each call are the same

  for (let r of scorer.requirements) {
    if (r >= 0) {
      calc[r] -= 1;
    }
    else {
      calc[4] += r;  // it's reducing the amount of money required
    }
  }

  for (let c of calc) {
    if (c < 0) {
      return 0;
    }
  }

  // "Next" is not calculated here, this function is for single scorer
  return scorer.score + get_score(scorer, calc);
}

function get_final_score(G, ctx) {
  let score = 0;
  let resources = [...G.foods, G.money];
  for (let scorer of G.scorers) {
    score += get_score(scorer, resources);
    if (scorer.next) {
      score += get_score(scorer.next, resources);
    }
  }

  G.final_score = score;
  G.ranking = "D";
  if (score >= 0 && score < 30) {
    G.ranking = "C";
  }
  else if (score >= 30 && score < 50) {
    G.ranking = "B";
  }
  else if (score >= 50 && score < 100) {
    G.ranking = "A";
  }
  else if (score >= 100 && score < 200) {
    G.ranking = "S";
  }
  else if (score >= 200 && score < 300) {
    G.ranking = "SS";
  }
  else {
    G.ranking = "SSS";
  }

  ctx.events.endGame();
}

function pick(G, ctx, original_deck, idx) {
  if (G.picks > 0) {
    if (original_deck.includes("scorer")) {
      move(G, ctx, "scorer_list", "scorers", idx);
    }
    else if (original_deck.includes("skill")) {
      let skill = G.skill_list[idx];
      if (pay(G, ctx, skill.cost)) {
        move(G, ctx, "skill_list", "skills", idx);
        if (skill.onTurnBegin && skill.battlecry) {
          skill.onTurnBegin(G, ctx, skill);
        }
      }
    }

    G.picks -= 1;
    // TODO: display picks
  }
}

function use(G, ctx, idx) {
  let skill = G.skills[idx];
  if (!skill.exhausted) {
    skill.action(G, ctx, skill);
    skill.exhausted = true;
  }
}

export function get_workplace_desc(workplace) {
  // No need the util function "process_workplace_data", do this on turn begin
  // What's more, (workplace.food_cost)? will return false with zero
  // >=0 also treats -1 better
  return <span>
    ${workplace.cost} &nbsp;
    {(workplace.food_cost >= 0)? food_icons[workplace.food_cost] : ""}
  </span>;
}

export const HP = {
  setup: setup,
  moves: {
    place,
    pick,
    use,
    get_final_score,
    shuffle_decks,
  },
  turn: {
    onBegin(G, ctx) {
      // Update data
      G.day += 1;
      G.workers = 3;
      G.money += 2;

      if (G.day > 1) {
        G.picks = 0;
      }

      // // If it's first day
      // if (G.day == 1) {
      //   G.picks += 1;
      //   G.scorers.push(ctx.random.Shuffle(SCORERS)[0]);
      // }

      // Setup market
      G.market = MARKET.map(x => ({...x}));
      for (let workplace of G.market) {
        workplace.workers = 0;

        if (workplace.food_type != undefined) { // Once again, "if 0" returns false, or if a number is required, use "!= undefined"
          workplace.cost += G.prices[G.day][workplace.food_type];
        }
      }

      // Refresh cards
      G.scorer_list = [];
      G.skill_list = [];
      for (let i=0; i<4; i++) {
        move(G, ctx, "scorer_deck", "scorer_list", 0);
        move(G, ctx, "skill_deck", "skill_list", 0);
        // TODO: add discard
      }

      // On turn begin and refresh skills
      for (let skill of G.skills) {
        skill.exhausted = false;
        if (skill.onTurnBegin) {
          skill.onTurnBegin(G, ctx, skill);
        }
      }
    },
  }
};