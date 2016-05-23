import React from 'react';

class SideMenu extends React.Component {
  constructor(){
    super();
    this.state = {
     title: '',
     show:true
   };
   this.close = this.close.bind(this);
 }
 close(){
  this.setState({show: false});
  }
  render() {
    return(
     <div id="side-menu" className={this.props.direction}>
     <div>
     <h3>{this.state.title ? this.state.title : this.props.title}</h3>
     <a href="#" className="icon close-button" title="Close Option Menu"/>
     </div>
     <button className="btn btn-default">Change Color</button>
     <button className="btn btn-default">Autosave</button>
     </div>
     );  	
  }
}

export default SideMenu;