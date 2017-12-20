import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import Layout from './components/Layout.js'

import 'semantic-ui-css/semantic.min.css'

const httpLink = createHttpLink({ uri: '/graphql' });

const middlewareLink = new ApolloLink((operation, forward) => {

  operation.setContext(({ headers }) => ({ 
    headers: {
      'X-Token': localStorage.getItem('token')
    }
  }));

  return forward(operation)
})

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={ client }>
    <Layout />
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))

// import registerServiceWorker from './registerServiceWorker'
// registerServiceWorker()
