import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import Form from './components/Form';
import FormOutput from './components/FormOutput';
import Home from './components/Home';



import {Router, Route, IndexRoute, browserHistory} from 'react-router';

render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path="/create/:id" component={Form} />
      <Route path="/form/:id" component={FormOutput} />
      
    </Route>
  </Router>
  ),
document.getElementById('jorder-react')
);