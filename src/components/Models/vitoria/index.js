import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './main.css';
import '../../../story.css';
import { FaImage } from 'react-icons/fa';
import defaultImage from '../../../assets/img/default.png';
import Models from '../models';

let dataStructure;

class Vitoria extends Component {
   constructor() {
        super();
        this.state = {
            data: 'domingo às 19h', 
            endereco: 'rua montevidéu, 900 penha - rj', 
            autor: 'Pr. Silas Malafaia',
            backgroundImage: '',
            modelType: '',
        }
    }
      
    render() {

       dataStructure = 
            <div className="boxContent">
                <div className="row">
                    <div className="lineOne">{this.state.data}</div>
                    <div className="lineTwo">{this.state.autor}</div>
                </div>
                <div className="row">
                    <div className="lineThree">{this.state.endereco}</div>
                </div>
            </div>

        return (
            <MuiThemeProvider>
                <Models structure={dataStructure}/>
            </MuiThemeProvider>
        );
    }
}

export default Vitoria;
