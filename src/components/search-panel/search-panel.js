import React, { Component } from "react";

import "./search-panel.css";

export default class SearchPanel extends Component {
  state = {
    term: "",
  };

  onUpdateSerch = (e) => {
    this.setState({
      term: e.target.value,
    });
    this.props.onUpdateSerch(e.target.value)
  };

  render() {
    return (
      <input
        placeholder="Поиск по записям"
        type="text"
        className="form-control search-input"
        value={this.state.term}
        onChange={this.onUpdateSerch}
      />
    );
  }
}

// = ({ term, onSerchValueChange })
//   const inputHandler = (e) => {
//     onSerchValueChange(e.target.value);
//   };
