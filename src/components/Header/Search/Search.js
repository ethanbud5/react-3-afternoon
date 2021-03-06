import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  inputChange(e){
    this.props.searchPosts(e.target.value);
  }

  render() {
    console.log(this.state)
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input onChange={(e)=>this.inputChange(e)} placeholder="Search Your Feed" />

          <SearchIcon id="Search__icon" />
        </div>
        
      </section>
    )
  }
}