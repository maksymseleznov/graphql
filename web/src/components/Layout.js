import React, { Component, Fragment } from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import * as Pages from './Pages';

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
        <Fragment>
          <Route path="/list" render={ ({ match, location, history }) =>
            <Switch>
              <Route path="/list/users" render={ ({ match, location, history }) => 
                <Pages.Users match={ match } location={ location } history={ history } 
                  // graphql query
                  query={{ firstName: "max" }}
                />
              } />
              <Route path="/list/events" render={ ({ match, location, history }) => 
                <Pages.Events match={ match } location={ location } history={ history } 
                  // graphql query
                  query={{ firstName: "vlad" }}
                />
              } />
              <Route render={ ({ match, location, history }) =>
                <Redirect to="/list/users" />
              } />
            </Switch>
          }/>
          <Route path="/sign-up" render={ ({ match, location, history }) => 
            <Pages.SignUp match={ match } location={ location } history={ history } />
          } />
          <Route exact path="/" render={ ({ match, location, history }) => 
            <Redirect to="/list" />
          } />
        </Fragment>
      </BrowserRouter>
    )
  }
}
  
export default Layout