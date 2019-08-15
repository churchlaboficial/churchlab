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

class Familia extends Component {
   constructor() {
        super();
        this.state = {
            lineOne: '12 de outubro às 19h', 
            lineTwo: 'Andrea', 
            address: 'rua montevidéu, 900 penha - rj',
            backgroundImage: '',
            modelType: '',
        }
    }
      
    render() {

        dataStructure = 
            <div className="boxContent">
                <div className="date">
                    <div className="lineOne">{this.state.lineOne}</div>
                    <div className="lineTwo">{this.state.lineTwo}</div>
                </div>
                <div className="row bottom">
                    <div className="lineThree">{this.state.address}</div>
                </div>
            </div>

        return (
            <MuiThemeProvider>
                <Models structure={dataStructure}/>
            </MuiThemeProvider>
        );
    }
}

export default Familia;
