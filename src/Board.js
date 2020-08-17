import React from 'react';
import _ from 'lodash';
import { get_workplace_desc } from './Game';
import { Market, Field } from './Central';
import { Panel } from './Panel';
import { InversedTabs } from './InversedTabs';
import { food_icons, guo_icon } from './icons';

import './Board.css';

export class Board extends React.Component {
  constructor(props) {
    super(props);

    this.process_workplace_data = this.process_workplace_data.bind(this);
    this.process_deck_data = this.process_deck_data.bind(this);
    this.handle_card_click = this.handle_card_click.bind(this);

    this.enter_next_day = this.enter_next_day.bind(this);

    this.state = {
      central: "market",

      scorer_list_selected: -1,
      skill_list_selected: -1,
      scorer_selected: -1,
      skill_selected: -1,

      game_count: 0,
    }
  }

  process_workplace_data(workplace, idx) {
    return {
      desc: get_workplace_desc(workplace),
      handleClick: () => (this.props.moves.place(idx)),
      ...workplace,
    };
  }

  process_deck_data(deck) {
    return this.props.G[deck].map((card, idx) => ({
      cardType: (deck.includes("scorer"))? "scorer" : "skill",
      selected: (this.state[deck+"_selected"] == idx),
      handleClick: this.handle_card_click(deck, idx),
      ...card,
    }));
  }

  handle_card_click(deck, idx) {
    return () => {
      let current_selected = this.state[deck+"_selected"];
      if (current_selected != idx) {
        this.setState({[deck+"_selected"]: idx});
      }
      else {
        if (deck.includes("list")) {
          // pick card
          this.props.moves.pick(deck, idx);
        }
        else {
          // use card
          this.props.moves.use(idx);
        }
        this.setState({[deck+"_selected"]: -1});
      }
    }
  }
  componentDidUpdate(){    
    if (this.props.ctx.gameover) {
      alert(`最终得分: ${this.props.G.final_score}\n评级: ${this.props.G.ranking}`);
      this.props.reset();
      this.props.moves.shuffle_decks(this.state.game_count+1);
      this.setState({game_count: this.state.game_count+1});
    }
  }
  enter_next_day() {
    if (this.props.G.day < 7) {
      this.props.events.endTurn();
    }
    else {
      this.props.moves.get_final_score();
    }
  }

  render() {
    let market = <Market 
      market = {this.props.G.market.map(this.process_workplace_data)}
    />;
    let field = <Field 
      deck1 = {this.process_deck_data("scorer_list")}
      deck2 = {this.process_deck_data("skill_list")}
    />;
    let home = <Field
      deck1 = {this.process_deck_data("scorers")}
      deck2 = {this.process_deck_data("skills")}
    />;
    let centrals = {market, field, home};
    let next_day = "下一天";
    if (this.props.G.day >= 7) {
      next_day = "算分";
    }
    return <div className="board">
      <Panel 
        data = {
          <span style={{lineHeight:"250%"}}>
            第{this.props.G.day}/7天 &nbsp;&nbsp;&nbsp;
            {_.times(this.props.G.workers, ()=>(guo_icon))}
          </span>
        }
      />
      {centrals[this.state.central]}
      <InversedTabs 
        selections = {["市场", "拿卡区", "我的卡"]}
        onSelect = {(idx) => {this.setState({central: Object.keys(centrals)[idx]})}}
        selectedIndex = {Object.keys(centrals).indexOf(this.state.central)}
      />
      <button 
        className = "next-day-button"
        onClick = {this.enter_next_day}
      >
        {next_day}
      </button>
      <Panel 
        data = {
          <span style={{lineHeight:"225%"}} >
            {food_icons[0]}:{this.props.G.foods[0]} &nbsp;&nbsp;
            {food_icons[1]}:{this.props.G.foods[1]} &nbsp;&nbsp;
            {food_icons[2]}:{this.props.G.foods[2]} &nbsp;&nbsp;
            {food_icons[3]}:{this.props.G.foods[3]} &nbsp;&nbsp;
            $:{this.props.G.money}
          </span>
        }
      />
    </div>
  }
}