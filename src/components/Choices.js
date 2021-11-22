import React, { Component } from 'react';
import './Choices.css';
class Choices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addeds: [] ,
    };
  }
  setQuery = (query) => {
      if(query.charCode === 13 && query.target.value !== '' && !this.state.addeds.includes(query.target.value) && this.props.choices.includes(query.target.value)) {
        this.setState({addeds:[query.target.value, ...this.state.addeds]});
      }
  }
  render() {
    const choicesadded = this.state.addeds.map(added => {
      return (
        <li
          onMouseEnter={this.props.eventSub(added)}
          onPointerEnter={this.props.eventSub(added)}
          key={added}>
            {added}
        </li>
      );
    });
    const choices = this.props.choices.map(choice => {
      return (
        <li
          onMouseEnter={this.props.eventSub(choice)}
          key={choice}>
            {choice}
        </li>
      );
    });
    return (
      <div className="all">
          <input 
          placeholder=" Search" 
          className="search-bar"
          onKeyPress={(e) => this.setQuery(e)}
          />
          <ul className="choices">
            {choicesadded}
            {choices}
          </ul>
      </div>
    );
  }
}

export default Choices;
