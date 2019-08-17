import React, { Component } from 'react';
import logo from './assets/img/logo.png';

import './App.css';
import './components/Editor/Editor.css';


import domtoimage from 'dom-to-image';
import Render from './components/Render/Render';
import { saveAs } from 'file-saver';
import ReactDOM from 'react-dom';

///////////////// MODELS ///////////////////

import Celebracao from './components/Models/celebracao';
import Ebd from './components/Models/ebd';
import Familia from './components/Models/familia';
import MulherVitoriosa from './components/Models/mulher-vitoriosa';
import Oracao from './components/Models/oracao';
import Palavra from './components/Models/palavra';
import SantaCeia from './components/Models/santa-ceia';
import Vitoria from './components/Models/vitoria';
import Models from './components/Models/models';

//////////////// UI ITEMS ///////////////////

import BackButton from './components/Header/BackButton/BackButton';

////////////////////////////////////////////

let ThemeContext = React.createContext('');


let blockType = [
  ["Celebração",  Celebracao],
  ["Palavra",  Palavra],
  ["Oração",  Oracao],
  ["Vitória",  Vitoria],
  ["EBD",  Ebd],
  ["Santa Ceia",  SantaCeia],
  ["Mulher Vitoriosa",  MulherVitoriosa],
  ["Família",  Familia],
];
var slugify = require('slugify');


class GlobalHeading extends React.Component{
  render(){ 
    return (
      <div className="App-global-heading">
        <div className="container">
          <h3>Escolha o tipo de arte<br></br> de acordo com o culto que deseja</h3>
        </div>
      </div>
    )
  }
}

class Blocks extends React.Component {
  constructor(props) {
    super(props);
  }

  updateTopMostParent() {
      window.updateTopMostParent(2); 
      window.updateModel(this.props.title);
      ThemeContext = React.createContext(this.props.title);
      
  }

  render() { 
    
    return ( 
      <div className="item" 
        onClick={ this.updateTopMostParent.bind(this) }
        >{this.props.title}
      </div>
     );
  }
}

class Editor extends Component {
    
  constructor(props) {
      super(props);
      this.state = {
      files: [],
      
    }
      this.handleInputChange = this.handleInputChange.bind(this)
    }
      handleInputChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
  
    updateTopMostParent() {
        window.updateTopMostParent(3); 
    }


    render() { 

      let Module;
      blockType.map( function( modules, i, array ) {
        if(modules[0] == ThemeContext._currentValue){
          Module = modules[1];
        }
      })
      
      return ( 
        <div>
          
          <Module/>
        </div>
       );
    }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      model:'',
    };
  }
  
  _appBlockTypes(){
    if(this.state.step === 1) {
      return(
        <div id="step-1" className="step">
          
          <GlobalHeading/>
          <div className="blockTypes container">
            <div className="models">
              {blockType.map(
                blockType => 
                  <Blocks 
                    
                    title={blockType[0]} 
                    key={blockType[0]}
                  />
              )} 
            </div>
          </div>
        </div>
      )
    } 
  }

  _appEditor(){

    if(this.state.step === 2) {
      return(
        <div id="step-2" className={"step " + slugify(this.state.model)}>
          <Editor themeModel={this.state.model}/>
        </div>
      )
    } 
  }

  _appRendering(){
    if(this.state.step === 3) {
      return(
        <div id="step-3" className="step">
            <Render/>
        </div>
      )
    } 
  }

  _appBackButton(){
    if(this.state.step > 1) {
      return(
        <div className="backButton">
           <BackButton/>
        </div>
      )
    } 
  }



 
  render() { 
    return (
      <main className="App-container">
        <div className="App-header">
        <img className="App-logo" src={require('./assets/img/logo.png')} />
        <img className="App-logo" src={require('./assets/img/logo.png')} />
        {this._appBackButton()}
        </div>
        {this._appBlockTypes()}
        {this._appEditor()}
        {this._appRendering()}
      </main>
    )
  }
}


 // Store reference of topmost parent component
 let TopMostParent = ReactDOM.render(<App />, document.getElementById('root'));

 window.updateTopMostParent = (someValue) => {
     // Update state of topmost parent when this method is called 
     let actualStep = TopMostParent.state.step;
     TopMostParent.setState({ step: someValue }); 
 };

 window.updateBackButton = (step) => {
  let actualStep = TopMostParent.state.step;
  TopMostParent.setState({ step: actualStep - step }); 
};

window.updateModel = (name) => {
  let actualModel = TopMostParent.state.model;
  TopMostParent.setState({ model: name }); 
};

 
 
export default App;