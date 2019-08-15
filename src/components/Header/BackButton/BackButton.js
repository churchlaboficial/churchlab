import React, { Component } from 'react';
import { FaBeer, FaArrowCircleLeft } from 'react-icons/fa';
import './BackButton.css';


class BackButton extends Component {
    constructor(props) {
        super(props);
      }
    
      updateBackButton() {
          window.updateBackButton(1); 
          console.log('update');
          let backgroundImages = React.createContext('')
      }
    
      render() { 
        return ( 
          <div className="item" 
            onClick={ this.updateBackButton.bind(this) }
            > <FaArrowCircleLeft />
          </div>
         );
      }
}
 
export default BackButton;