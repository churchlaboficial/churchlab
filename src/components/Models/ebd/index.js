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

class EBD extends Component {
    constructor(){
        super();
        this.state = {
            data: 'domingo às 19h', 
            autor: '',
            endereco: 'rua montevidéu, 900 penha - rj', 
            backgroundImage: '',
            modelType: '',
            culto: 'EBD',
        }
    }
      
    render() {

        dataStructure = 
            <div className="boxContent">
                <div className="row rowOne">
                    <div className="lineOne">{this.state.data}</div>
                </div>
                <div className="row rowTwo">
                    <div className="lineThree">{this.state.endereco}</div>
                </div>
            </div>

        return (
            <MuiThemeProvider>
                <Models cultoName={this.state.culto} structure={dataStructure}/>
            </MuiThemeProvider>
        );
    }
}

export default EBD;
