import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './main.css';
import '../../../story.css';
import '../../../wide.css';
import { FaImage } from 'react-icons/fa';
import defaultImage from '../../../assets/img/default.png';
import Models from '../models';
import filialName from '../models';

let dataStructure;


class Bereana extends Component {
    constructor(){
        super();
        this.state = {
            data: 'domingo às 19h',
            autor: 'Pr. Silas Malafaia',
            endereco: 'rua montevidéu, 900 penha - rj',
            backgroundImage: '',
            modelType: '',
            culto: 'Bereana',
        }
    }

    render() {

        dataStructure =
            <div className="boxContent">
                <div className="row rowOne">
                    <div className="line Two">
                        <div className="lineThreee">
                          <span className="lineOne">{this.state.data}</span>
                          <span className="lineThree">{localStorage.getItem('endereco') ? localStorage.getItem('endereco') : this.state.endereco}</span></div>
                        <div className="lineTwo">
                          <span>{localStorage.getItem('pastor') ? localStorage.getItem('pastor') : this.state.autor}</span></div>
                    </div>
                </div>
            </div>

        return (
            <MuiThemeProvider>
                <Models cultoName={this.state.culto} structure={dataStructure}/>
            </MuiThemeProvider>
        );
    }
}

export default Bereana;