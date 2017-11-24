import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout.js';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  link: new HttpLink({ uri: `${ process.env.REACT_APP_URL }/graphql` }),
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={ client }>
    <Layout />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();
