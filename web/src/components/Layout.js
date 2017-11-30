import React, { Component } from 'react'

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Users from './pages/Users'
import Events from './pages/Events'

class Layout extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    return (
      <BrowserRouter>
        <Route path="/list" render={ ({ match, location, history }) =>
          <Switch>
            <Route path="/list/users" render={ ({ match, location, history }) => 
              <Users match={ match } location={ location } history={ history } 
                // graphql query
                query={{ firstName: "vlad" }}
              />
            } />
            <Route path="/list/events" render={ ({ match, location, history }) => 
              <Events match={ match } location={ location } history={ history } 
                // graphql query
                query={{ firstName: "vlad" }}
              />
            } />
            <Route render={ ({ match, location, history }) =>
              <Redirect to="/list/users" />
            } />
          </Switch>
        }/>
      </BrowserRouter>
    )
  }
}
  
export default Layout