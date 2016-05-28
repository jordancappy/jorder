import React from 'react';
import {render} from 'react-dom';
import Form from './components/Form';
import FormList from './components/FormList';

import {Router, Route} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

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

let history = createBrowserHistory();

render((
  <Router history={history}>
    <Route path='/' component={App}>

      <Route path="/create/:id" component={Form} />

      //TODO: consolidate both /home and index page into 1
      <Route path="/home" component={FormList} />
    </Route>
  </Router>
  ),
document.getElementById('jorder-react')
);