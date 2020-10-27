import React, { Component } from 'react';
import Categories from './components/Categories';
import './App.css'

export class App extends Component {
  
  render() {
    return (
      <div className="App container">
        <h1>Dunder Mifflin Item Manager</h1>
        <h5>Step 1: Add a Category by typing the category name in "Add Category" and clicking the "Add" button</h5>
        <h5>Step 2: Add an item in each category by filling in the appropriate "Add Item" fields and hitting "Add" button</h5>
        <h6>To Edit a category name or item, hit the respective edit button and edit it the intial category / item input boxes</h6>
        <Categories />
        <br/><br/><br/>
      </div>
    )
  }
}

export default App;
