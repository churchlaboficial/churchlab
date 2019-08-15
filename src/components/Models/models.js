import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FaImage } from 'react-icons/fa';
import loader from '../../assets/img/loading.gif';


let backgroundImages = React.createContext('');

class Models extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineOne: this.props.datadia, lineTwo: this.props.dataendereco, lineThree: this.props.dataautor,
            backgroundImage: '',
            modelType: '',
            
      }
        this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
        this.handleBackgroundTemplate = this.handleBackgroundTemplate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.changeModelType = this.changeModelType.bind(this)
      }
        handleInputChange(e){
            
          const target = e.target;
          const value = target.type === 'checkbox' ? target.checked : target.value;
          const name = target.name;

          this.setState({
			[name]: value
          })

          document.querySelectorAll('input[name$="'+name+'"]')[0].value = this.state[name];
          document.getElementsByClassName(name)[0].innerHTML = value;
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
            newMask.innerHTML = '<h3>Gerando seu arquivo...</h3><img src="'+loader+'">';
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

                 domtoimage.toPng(node, {
                     width: defaultWidth,
                     height: defaultHeight,
                 })
                 .then(function (blob) {
                     window.saveAs(blob, 'reino-criativo-'+formatedDate+'.png');
                 });

                 document.getElementById('boxToEdit').classList.remove('export');
                               
                setTimeout(function(){

                    body.style.overflow = 'auto';
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
                    <h3>Sucesso!</h3>
                    <h5>Seu arquivo foi gerado.</h5>
                    <span>Obrigado por usar o nosso gerador.</span>
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
                            </div>
                        </div>
                    </div>
                    <div className="contentFields">
                        <div className="fields">
                            <div className="modelType">
                                <Button onClick={this.changeModelType.bind(this)} className="model-btn">
                                    feed
                                </Button>
                                <Button onClick={this.changeModelType.bind(this)} className="model-btn">
                                    story
                                </Button>
                            </div>
                            <h4 className="backgroundTitle">Imagem de fundo</h4>
                            <div className="imgChange" id="dumpoption" onClick={this.handleBackgroundTemplate}>
                                <FaImage/>
                            </div>

                            <div className="imgChangeOptions">
                                {renderBackgroundOptions}
                                {positionBackground}
                                <Button onClick={this.handleBackgroundTemplate} className="model-btn changeBackgroundType">
                                    Alterar
                                </Button>
                            </div>
                            <input type="file" className="fileInput" onChange={this.handleBackgroundChange}  accept="image/*" />
                            
                            <TextField name="lineOne" placeholder="Nome" onChange={this.handleInputChange.bind(this)} value={this.state.lineOne} />
                            <TextField name="lineTwo" onChange={this.handleInputChange.bind(this)} value={this.state.lineTwo} />
                            <TextField name="lineThree" onChange={this.handleInputChange.bind(this)} value={this.state.lineThree} />
                            <Button onClick={this.prepareDownload} variant="contained" color="primary">
                                GERAR
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
