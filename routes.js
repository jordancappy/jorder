import React from 'react'
import {render} from 'react-dom'
import App from './components/App'
import FormPage from './containers/FormPage'
import FormOutput from './components/FormOutput'
import Home from './components/Home'

import {Router, Route, IndexRoute, browserHistory} from 'react-router'

export default (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path="/create/:id" component={FormPage} />
      <Route path="/form/:id" component={FormOutput} />
    </Route>
  </Router>
)