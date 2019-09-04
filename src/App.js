import React, { Component } from 'react';
import logo from './assets/img/logo.png';

import './App.css';
import './components/Editor/Editor.css';


import domtoimage from 'dom-to-image';
import Render from './components/Render/Render';
import { saveAs } from 'file-saver';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
      username:'',
      password:'',
      userNiceName:'',
      userEmail:'',
      loggedIn: false,
      loading: false,
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.userLogout = this.userLogout.bind(this);
  }
  

  userLogout(e) {
    e.preventDefault();
    console.log(e);
    localStorage.removeItem('token');
    localStorage.removeItem('userName');

    this.setState({loggedIn: false, step: 1})
  }

  handleChange(e){

    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
        [name]: value
    })

  }

  createUser(nonce){
    axios.get('https://dev.zpixel.com.br/churchlab/api/user/register/?username='+this.state.username+'&email='+this.state.email+'&nonce=' + nonce + '&user_pass='+this.state.password+ '&display_name='+this.state.display_name+'&insecure=cool')
    .then(res => {
        const data = res.data;
        console.log(data);
    }).catch(error => {
    console.log(error.response)
  });
  }

  getWpNounce(){

    axios.get('https://dev.zpixel.com.br/churchlab/api/get_nonce/?controller=user&method=register')
    .then(res => {
        console.log(res.data);
        this.createUser(res.data.nonce);
    }).catch(error => {
        console.log(error.response);
    })

  }


  handleSubmit(e){

    e.preventDefault();
    
    const siteUrl = 'https://dev.zpixel.com.br/churchlab';
    const loginData ={
        username: this.state.username,
        password: this.state.password,
    }

    this.setState({loading:true}, () => {
       axios.post(`${siteUrl}/wp-json/jwt-auth/v1/token`, loginData)
       .then( res=> {
           if(undefined === res.data.token){
               this.setState( { error: res.data.message, loading: false});
               return;
           }

           localStorage.setItem('token', res.data.token);
           localStorage.setItem('userName', res.data.user_nicename);

           this.setState( { 
               token: res.data.token, 
               loading: false,
               userNiceName: res.data.user_nicename,
               userEmail: res.data.user_email,
               loggedIn: true
            });

           console.log(res.data);
       })
       .catch( err =>{
            this.setState( { error: err.response.data, loading: false});
       })
    })
    
    
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

  _loggoutButton(){
    return(
      <div className="logout">
          <a
           onClick={ this.userLogout.bind(this) }>Logout</a>
      </div>
    )
  }

  

  render() { 

    if(this.setState.loggedIn === true || localStorage.getItem('token')){
      return (
        <main className="App-container">
          <div className="AppBlockMobile">
            <div className="AppBlockMobile__Container">
              <img src={require('./assets/img/alert-icon.png')} />
              Para melhor performance indicamos utilizar um computador para a criação das artes. 
            </div>
          </div>
          <div className="App-header">
          <img className="App-logo" src={require('./assets/img/logo.png')} />
          {this._appBackButton()}
          {this._loggoutButton()}
          </div>
          {this._appBlockTypes()}
          {this._appEditor()}
          {this._appRendering()}
        </main>
      )
    }
    else{

      return ( 

        <main className="App-container">
        <div className="AppBlockMobile">
          <div className="AppBlockMobile__Container">
            <img src={require('./assets/img/alert-icon.png')} />
            Para melhor performance indicamos utilizar um computador para a criação das artes. 
          </div>
        </div>
        <div className="App-header">
        <img className="App-logo" src={require('./assets/img/logo.png')} />
          {this._appBackButton()}
        </div>
      
        <div className="loginForm step">
          <div className="App">
              <form onSubmit={this.handleSubmit}> 
              <div className="form-group">
                  <input name="username" value={this.state.username} onChange={this.handleChange} type="text" className="form-control" id="username" aria-describedby="user" placeholder="Usuário" />
              </div>
             
              <div className="form-group">
                  <input name="password" value={this.state.password} onChange={this.handleChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Senha" />
              </div>
             
              <button type="submit" className="btn btn-primary">Enviar</button>
              </form>
          </div>
        </div>
      </main>

          
         );

  }
    
   
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