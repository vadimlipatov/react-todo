import React, { Component } from "react";
import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter/post-status-filter";
import PostList from "../post-list/post-list";
import PostAddForm from "../post-add-form";

import "./app.css";
import styled from "styled-components";

const AppBlock = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

export default class App extends Component {
  state = {
    data: [
      { label: "Going to learn React", important: true, like: false, id: 1 },
      { label: "That is so good", important: false, like: false, id: 2 },
      { label: "I need a break...", important: false, like: true, id: 3 },
    ],
    term: "",
    filter: "all",
  };

  deleteItem = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const before = data.slice(0, index);
      const after = data.slice(index + 1);
      const newArr = [...before, ...after];
      return {
        data: newArr,
      };
    });
  };

  addItem = (body) => {
    const newItem = {
      label: body,
      important: false,
      id: Math.random(0,99999999)
    };
    const newArr = [newItem, ...this.state.data];
    this.setState(() => {
      return {
        data: newArr,
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const newArr = [...data];
      newArr[index].important = !newArr[index].important;
      return {
        data: newArr,
      };
    });
  };

  onToggleLiked = (id) => {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const newArr = [...data];
      newArr[index].like = !newArr[index].like;
      return {
        data: newArr,
      };
    });
  };

  searchPost = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.indexOf(term) > -1;
    });
  };

  filterPost = (items, filter) => {
    if (filter === "like") {
      return items.filter((item) => item.like);
    } else {
      return items;
    }
  };

  onUpdateSerch = (term) => {
    this.setState({
      term: term,
    });
  };

  onUpdateFilter = (filter) => {
    this.setState({
      filter: filter,
    });
  };

  render() {
    const { data, term, filter } = this.state;
    const liked = data.filter((item) => item.like).length;
    const all = data.length;

    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

    return (
      <AppBlock>
        <AppHeader liked={liked} all={all} />
        <div className="search-panel d-flex">
          <SearchPanel term={term} onUpdateSerch={this.onUpdateSerch} />
          <PostStatusFilter onUpdateFilter={this.onUpdateFilter} filter={filter}/>
        </div>
        <PostList
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}
          posts={visiblePosts}
          onDelete={this.deleteItem}
        />
        <PostAddForm onAdd={this.addItem} />
      </AppBlock>
    );
  }
}
