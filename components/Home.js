import React from 'react';
import HomePage from './HomePage';
import FormList from './FormList';

class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      isLoggedIn : false
    };
  }
  componentDidMount(){
    $.get('/api/users',(data)=>{
      this.setState({
        isLoggedIn: !!data
      });
    });
  }
  render() {
    let body = this.state.isLoggedIn ? 
      <FormList /> : <HomePage />;
    return (
      <div>
        {body}
      </div>
    );
  }
};

export default Home;