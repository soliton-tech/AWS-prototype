import React, { Component } from 'react';
import './card.css';
import '../../Global.css';

import GreenArrow from '../../assets/green-arrow.svg';

class Card extends React.Component {
  state = {
    header: this.props.header,
    content: this.props.content
  };

  render() { 
    return (
      <div className="card-wrapper">
        <div className="card" onClick={this.props.onClick}>
          <div className="card-lft">
            <img className="icon" src={require(`../../assets/${this.props.icon}`)}/>
          </div>
          <div className="card-centre">
            <div className="header">
              {this.state.header}
            </div>
            <div className="content">
              {this.state.content}
            </div>
          </div>
          <div className="card-rght">
            <img className="arrow" src={GreenArrow}/>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Card;