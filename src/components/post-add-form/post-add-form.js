import React, { Component } from "react";

import "./post-add-form.css";

export default class PostAddForm extends Component {
  state = {
    input: "",
  };

  onValueChange = (e) => {
      this.setState({
        input: e.target.value,
      });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.input) {
      this.props.onAdd(this.state.input);
      this.setState({
        input: "",
      });
    }
  };

  render() {
    return (
      <form className="bottom-panel d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="О чем вы думаете сейчас?"
          className="form-control new-post-label"
          onChange={this.onValueChange}
          value={this.state.input}
        />
        <button type="submit" className="btn btn-outline-secondary">
          Добавить
        </button>
      </form>
    );
  }
}
