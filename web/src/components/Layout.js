import React, { Component } from 'react'

// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Test from './pages/Test'

class Layout extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {

  }

  render() {
    return (
      <Router>
        <Route path="/histology" render={ ({ match, location, history }) =>
          <Switch>
            <Route path="/histology/pending" render={ ({ match, location, history }) => 
              <Test match={ match } location={ location } history={ history } />
            } />
            <Route render={ ({ match, location, history }) =>
              <Redirect to="/histology/pending"/>
            } />
          </Switch>
        }/>
      </Router>
    )
  }
}
  
export default Layout