import React, { Component } from 'react';

// import { ApolloClient } from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// // import { ApolloProvider } from 'react-apollo';
// import { graphql } from "react-apollo";
// import gql from 'graphql-tag';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React (test)</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

// const client = new ApolloClient({
//   link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
//   cache: new InMemoryCache()
// });

// client.query({
//   query: gql`
//     query {
//       getUsers {
//         id
//       }
//     }
//   `,
// })
// .then(data => console.log(data))
// .catch(error => console.error(error));


// https://codesandbox.io/s/jvlrl98xw3
// https://launchpad.graphql.com/v7mnw3m03
// https://dev-blog.apollodata.com/apollo-client-2-0-5c8d0affcec7

// const test = graphql(gql`
//   query {
//     getUsers {
//       id
//     }
//   }
// `)(props => (
//   <div>{ props.data.getUsers.map(user => console.log(user)) }</div>
// ));

// export default graphql(gql`
// mutation submitRepository($repoFullName: String!) {
//   submitRepository(repoFullName: $repoFullName) {
//     createdAt
//   }
// }
// `)(props => (
// <button
//   onClick={() => {
//     // Mutate function passed via props 
//     props.mutate({
//       variables: {
//         repoFullName: "apollographql/apollo-client"
//       }
//     });
//   }}
// >
//   Click me
// </button>
// ));



// const USER_QUERY = gql`
// query RestData($email: String!){
//   user(email: $email) @rest(route: '/users/email/:email', email: $email) {
//     id
//     firstName
//     friends @rest(route: '/users/friends/:id') @provides(vars: ['id']) {
//       firstName
//   }
// }
// `;

// export default graphql(USER_QUERY)(({ data }) => {
// if (data.loading) return <div>loading...</div>;
// return (
//   <div>
//     <p>{data.user.firstName} has {data.user.friends.length} friends:</p>
//     <ul>
//       {data.user.friends.map(({ firstName }) => (
//         <li>{firstName}</li>
//       )}
//     </ul>                     
//   </div>
// )
// }