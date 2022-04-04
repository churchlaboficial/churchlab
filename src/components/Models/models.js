import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { FaImage } from 'react-icons/fa';
import loader from '../../assets/img/loading.gif';
import Select from 'react-select';
import axios from 'axios';


let backgroundImages = React.createContext('');

let userAddress;
let userFilial;
let userHoster;
let userPhone;
let filialLogo;
let filialInformation;


let options = [ ];
let filialOptions = '';


class Models extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImage: '',
            modelType: '',
            cultoType: this.props.cultoName,
            filials: [],
            loadingFilials: true,
            

      }
        this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
        this.handleBackgroundTemplate = this.handleBackgroundTemplate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeModelType = this.changeModelType.bind(this);

      }
        handleInputChange(e){

          const target = e.target;
          const value = target.type === 'checkbox' ? target.checked : target.value;
          const name = target.name;

          this.setState({
            [name]: value
          })

          console.log(this.props.teste);

          switch(name) {
            case "lineOne":
                var input = document.querySelector('textarea[name="lineOne"]');
                input.setAttribute("maxlength", 35);
            break;
            case "lineTwo":
                var input = document.querySelector('textarea[name="lineTwo"]');
                input.setAttribute("maxlength", 40);
            break;
            case "lineThree":
                var input = document.querySelector('textarea[name="lineThree"]');
                input.setAttribute("maxlength", 70);
            break;
            case "lineFour":
                var input = document.querySelector('textarea[name="lineThree"]');
                input.setAttribute("maxlength", 70);
            break;

            }

          document.getElementsByClassName(name)[0].innerHTML = value;
      }

    getBase64Image(imgUrl, callback) {

    var img = new Image();

    // onload fires when the image is fully loadded, and has width and height

    img.onload = function(){

      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png"),
          dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

      callback(dataURL); // the base64 string

    };

    // set attributes and src 
    img.setAttribute('crossOrigin', 'anonymous'); //
    img.src = imgUrl;

}


    triggerInput = (event) => {
        document.querySelector("input[type='file']").click();
        this.setState({modelType: event.currentTarget.dataset.type});

    }

    handleBackgroundTemplate(e) {
        let backgroundOptions = document.getElementsByClassName('backgroundOptions')[0];
        backgroundOptions.classList.add('active');
    }

    handleBackgroundChange(e){
        let background;
        if(this.state.modelType == 'single'){
            background = document.getElementById('boxToEdit');
        }
        else if(this.state.modelType == 'dual-one'){
            background = document.getElementById('dual-one');
        }
        else if(this.state.modelType == 'dual-two'){
            background = document.getElementById('dual-two');
        }


        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = function () {
            background.src = reader.result;
            background.style.backgroundImage = "url('"+reader.result+"')";
        }

        if (file) {
        reader.readAsDataURL(file);
        } else {
            background.src = "";
        }
    }



    prepareDownload(event) {

        let body;

        if(document.getElementById('downloadMask')){
            document.getElementById('downloadMask').classList = '';
        }
        else{

            // Display Wait for load screen //

            let root = document.getElementById('root');
            let newMask = document.createElement('div');
            newMask.id = 'downloadMask';
            newMask.innerHTML = '<h3>Criando sua arte...</h3><img src="'+loader+'">';
            root.appendChild(newMask);
            body = document.getElementsByTagName('body')[0];
            body.style.overflow = 'hidden';

        }

        setTimeout(function(){
            // Add Export Class and Download image //
            document.getElementById('boxToEdit').classList.add('export');

            setTimeout(function(){

                 // RENDER HOURS //

                 var date = new Date();
                 let formatedDate = date.getDate() + '/'+ (date.getMonth() + 1) + '/'+ date.getFullYear()+ '-'+ date.getHours()+ '-'+ date.getMinutes()+ '-'+ date.getSeconds();
                 let node = document.getElementById('boxToEdit');


                 var canvas = document.getElementById("canvas"),
                 html_container = document.getElementById("boxToEdit"),
                 html = html_container.innerHTML;

                 let defaultWidth = 1080;
                 let defaultHeight = 1080;

                 if(document.getElementById('root').className === 'story'){
                     defaultWidth = 1080;
                     defaultHeight = 1920;
                 }

                 if(document.getElementById('root').className === 'wide'){
                     defaultWidth = 1920;
                     defaultHeight = 1080;
                 }

                 domtoimage.toPng(node, {
                     width: defaultWidth,
                     height: defaultHeight,
                 })
                 .then(function (blob) {
                     window.saveAs(blob, 'reino-criativo-'+formatedDate+'.png');
                 });

                 document.getElementById('boxToEdit').classList.remove('export');

                setTimeout(function(){

                    if(body) { body.style.overflow = 'auto'; }
                    document.getElementById('downloadMask').classList.add('hide');
                    document.getElementById('appNotification').classList.add('active');

                    setTimeout(function(){
                        document.getElementById('appNotification').classList.remove('active');
                    }, 4500);

                }, 1000);

             }, 1000);

        }, 500);

    }


    changeModelType(e){
        let modelType = e.target.innerHTML;
        let root = document.getElementById('root');

        root.className = '';
        root.className = modelType;
    }

    handleBackgroundPosition(e){
        let valueToChange = e.target.value;
        let changePosition = e.currentTarget.dataset.id;
        let focusBackground;

        if(changePosition === 'dual-one'){
            focusBackground = document.getElementById('dual-one');
        }
        if(changePosition === 'dual-two'){
            focusBackground = document.getElementById('dual-two');
        }
        if(changePosition === 'single'){
            focusBackground = document.getElementById('boxToEdit');
        }


        focusBackground.style.backgroundPosition = valueToChange;
    }

    changeBackgroundUploadModel(event){
        event.preventDefault();
        backgroundImages = React.createContext(event.currentTarget.dataset.images);

        if(backgroundImages._currentValue == 'two'){
          document.getElementsByClassName('dualBackground')[0].classList.add('active');
        }

        let backgroundOptions = document.getElementsByClassName('backgroundOptions')[0];
        backgroundOptions.classList.remove('active');

        this.forceUpdate();

    }


    render() {


        let renderBackgroundOptions;
        let positionBackground;
        let lineOneContent;


        if(backgroundImages._currentValue === "two"){
            let clearBoxToEdit = document.getElementById('boxToEdit');
            let dumpoption = document.getElementById('dumpoption');
            let imgChangeOptions = document.getElementsByClassName('imgChangeOptions')[0];
            let changeBackgroundType = document.getElementsByClassName('changeBackgroundType')[0];

            if(imgChangeOptions) imgChangeOptions.classList.add('active');
            if(dumpoption) dumpoption.classList.add('hide');
            if(changeBackgroundType) changeBackgroundType.classList.add('active');
            if(clearBoxToEdit) clearBoxToEdit.style.backgroundImage = '';

            positionBackground =
                <div className="backgroundPosition dual">
                    <div className="box">
                        <select name="position" data-id="dual-one" onChange={this.handleBackgroundPosition.bind(this)}>
                            <option value="default">Posicionar</option>
                            <option value="top">Cima</option>
                            <option value="bottom">Baixo</option>
                            <option value="left">Esquerda</option>
                            <option value="right">Direita</option>
                            <option value="center">Centro</option>
                        </select>
                    </div>
                    <div className="box">
                        <select name="position" data-id="dual-two" onChange={this.handleBackgroundPosition.bind(this)}>
                            <option value="default">Posicionar</option>
                            <option value="top">Cima</option>
                            <option value="bottom">Baixo</option>
                            <option value="left">Esquerda</option>
                            <option value="right">Direita</option>
                            <option value="center">Centro</option>
                        </select>
                    </div>
                 </div>;

            renderBackgroundOptions =
            <div className="options dual">
                <div className="imgChange" data-type="dual-one" onClick={this.triggerInput.bind(this)}>
                    <FaImage/>
                </div>
                <div className="imgChange" data-type="dual-two" onClick={this.triggerInput.bind(this)}>
                    <FaImage/>
                </div>
            </div>
        }
        else if(backgroundImages._currentValue === "one"){
            let dumpoption = document.getElementById('dumpoption');
            let imgChangeOptions = document.getElementsByClassName('imgChangeOptions')[0];
            let changeBackgroundType = document.getElementsByClassName('changeBackgroundType')[0];
            let dualBackground  = document.getElementsByClassName('dualBackground ')[0];

            if(imgChangeOptions) imgChangeOptions.classList.add('active');
            if(dumpoption) dumpoption.classList.add('hide');
            if(changeBackgroundType) changeBackgroundType.classList.add('active');
            if(dualBackground) dualBackground.classList.remove('active');

            positionBackground =
            <div className="backgroundPosition single">
                <div className="box">
                    <select name="position" data-id="single" onChange={this.handleBackgroundPosition.bind(this)}>
                        <option value="default">Posicionar</option>
                        <option value="top">Cima</option>
                        <option value="bottom">Baixo</option>
                        <option value="left">Esquerda</option>
                        <option value="right">Direita</option>
                        <option value="center">Centro</option>
                    </select>
                </div>
             </div>;

            renderBackgroundOptions =
            <div className="options single">
                <div className="imgChange" data-type="single"  onClick={this.triggerInput.bind(this)}>
                    <FaImage/>
                </div>
            </div>
        }

        let baseBackground = this.state.backgroundImage.toString();

        return (
            <MuiThemeProvider>
            <div className="App-editor">
                <div id="appNotification">
                    <h3>Sucesso! Sua arte foi criada e está pronta para usar!</h3>
                </div>
                <div className="backgroundOptions">
                    <div className="heading">
                    <h4>Escolha o modelo</h4>
                    </div>
                    <div className="options">
                    <div className="option">
                        <a onClick={this.changeBackgroundUploadModel.bind(this)} data-images="one" href="">
                        <img src={require('../../assets/img/single-background.png')} alt=""/>
                        </a>
                        <span>Uma imagem</span>
                    </div>
                    <div className="option">
                        <a onClick={this.changeBackgroundUploadModel.bind(this)} data-images="two" href="">
                        <img src={require('../../assets/img/dual-background.png')} alt=""/>
                        </a>
                        <span>Duas imagens</span>
                    </div>
                    </div>
                </div>
                <div className="container">
                    <div className="contentBox">
                        <div id="boxToEdit">
                            <div className="dualBackground">
                                <div id="dual-one" className="one option"></div>
                                <div id="dual-two" className="two option"></div>
                            </div>
                            <div className="defaultBackground feed">
                                {this.props.structure}
                                <div className="logoadvec">
                                    <img id="logo" src={require('../../assets/img/LogoADVEC.png')} alt=""/>
                                </div>
                                <div className="endadvec">
                                    ASSEMBLEIA DE DEUS VITÓRIA EM CRISTO | {this.state.lineFour}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contentFields">
                        <div className="fields">
                            {this.state.cultoType == 'Celebracao' &&
                                <TextField
                                    multiline
                                    rowsMax={3}
                                    label="Teste"
                                    margin="normal"
                                    variant="outlined"
                                    name="lineFour"
                                    onChange={this.handleInputChange.bind(this)}
                                    value={this.state.lineFour}
                                />
                            }
                            
                            <TextField
                                multiline
                                rowsMax={3}
                                label="Nome da Filial"
                                margin="normal"
                                variant="outlined"
                                name="lineFour"
                                onChange={this.handleInputChange.bind(this)}
                                value={this.state.lineFour}
                            />
                            <TextField
                                multiline
                                rowsMax={3}
                                label="Endereço da Filial"
                                margin="normal"
                                variant="outlined"
                                name="lineThree"
                                onChange={this.handleInputChange.bind(this)}
                                value={this.state.lineThree}
                            />

                            <TextField
                                multiline
                                rowsMax={2}
                                variant="outlined" margin="normal"
                                label="Data do culto" name="lineOne"
                                placeholder="Domingo às 19h"
                                onChange={this.handleInputChange.bind(this)}
                                value={this.state.lineOne}
                            />
                            <TextField
                                multiline
                                rowsMax={3}
                                label="Nome dos convidados"
                                margin="normal"
                                id="lineTwo"
                                placeholder="Aperte ENTER para pular de linha..."
                                variant="outlined"
                                name="lineTwo"
                                onChange={this.handleInputChange.bind(this)}
                                value={this.state.lineTwo}
                            />

                            <div className="imgChange" id="dumpoption" onClick={this.handleBackgroundTemplate}>
                                <FaImage/>
                                <div style={{ color: 'white', marginLeft: '10px' }}>Escolha a foto de fundo</div>
                            </div>

                            <div className="imgChangeOptions">
                                {renderBackgroundOptions}
                                {positionBackground}
                                <Button onClick={this.handleBackgroundTemplate} className="model-btn changeBackgroundType">
                                    Alterar
                                </Button>
                            </div>
                            <input type="file" className="fileInput" onChange={this.handleBackgroundChange}  accept="image/*" />

                            <div className="modelType">
                                <Grid item xs={12}>
                                    <ButtonGroup color="secondary" size="large" fullWidth aria-label="full width outlined button group">
                                      <Button onClick={this.changeModelType.bind(this)} >feed</Button>
                                      <Button onClick={this.changeModelType.bind(this)} >story</Button>
                                      <Button onClick={this.changeModelType.bind(this)} >wide</Button>

                                    </ButtonGroup>
                                </Grid>
                            </div>


                            <Button size="large" onClick={this.prepareDownload} variant="contained" className="buttonGerar">
                                GERAR ARTE
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
            </MuiThemeProvider>
        );
    }
}

export default Models;
