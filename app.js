import React from 'react';
import {render} from 'react-dom';
import Form from './components/Form';
import Home from './components/Home'

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

//TODO: move this into own file
class App extends React.Component {
  render() {
    return (
      <div>
      {this.props.children}
      </div>
      );
  }
}

render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path="/create/:id" component={Form} />
    </Route>
  </Router>
  ),
document.getElementById('jorder-react')
);