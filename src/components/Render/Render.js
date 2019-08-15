import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Render.css';



class Render extends Component {
    
    constructor(props) {
        super(props);
      }
    
      updateTopMostParent() {
          window.updateTopMostParent(3); 
      }
    
      render() { 
        return ( 
          <div className="item" 
            onClick={ this.updateTopMostParent.bind(this) }
            > Render
          </div>
         );
      }
}
 
export default Render;