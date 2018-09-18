import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


let defaulttextColor = '#fff';

let defaultStyle = {
  color: defaulttextColor,
}

class Aggregate extends Component{
  render() {
    return (
            <div style={{width: '40%', display: 'inline-block'}} 
            className="aggregate">
              <h2 style ={{...defaultStyle, width: '40px', display: 'inline-block'}}>Number Text</h2>
            </div>
      );
  }
}

class Filter extends Component{
  render() {
    return (
          <div style={defaultStyle}>
            <img/>
              <input type = 'text'/>
          </div>

      );
  }}

class Playlist extends Component{
  render() {
    return(
        <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        
          <img/>
          
            <h3> Playlist Name</h3>
            <ul><li>Song 1</li><li>Song 2</li><li>Song 3</li><li>Song 4</li></ul>
        </div>
      )
    }
  }


class App extends Component {

  render() {
    let name = "Allan";
    //let color = {green};
    return (
      <div className="App" style={{...defaultStyle, 'height': '100%', 'width': '100%'}}>

        <h1 style={defaultStyle}>Title</h1>

        <Aggregate/>

        <Aggregate/>

        <Filter/>

        <Playlist/>

        <Playlist/>

        <Playlist/>

      </div>
    );
  }
}

export default App;
