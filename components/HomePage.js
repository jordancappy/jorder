import React from 'react';

class HomePage extends React.Component {
  render(){
    return(
      <div>
        <div className="page-header text-center">
          <h1>jorder</h1>
          <p className="lead">create html 5 forms with so much ease</p>
          <h1>
            <a className="btn btn-lg btn-success" href="/auth/google">log in with google</a>
          </h1>
        </div>
      </div>
    );
  }
}

export default HomePage;