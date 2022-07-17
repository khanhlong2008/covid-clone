import React, { Component } from "react";
import { Input } from 'antd';
export default class SearchVaccine extends Component {
  state = {
    query: "",
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.props.OnSearchVaccine(this.state.query);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.query !== this.state.query) {
      return true;
    }
    return false;
  }
  onQueryChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };
  render() {
    return (
      <Input 
      placeholder="Search Country ..." 
      type="text"
      value={this.state.value}
      onChange={this.onQueryChange}
      />
    );
  }
}
