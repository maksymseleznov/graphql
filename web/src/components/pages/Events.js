import React from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const ExchangeRateQuery = gql`
  query users ($query: UserQueryInput, $skip: Int, $limit: Int) {
    getUsers (query: $query, skip: $skip, limit: $limit) {
      id
      firstName
      lastName
    }
  }
`;

const ExchangeRateList = ({
  query,
  loading,
  error,
  users,
}) => (
  <div>
    { loading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>{ error && `An error has occurred: ${error}` }</div>
    ) : (
      users.map(({ firstName, lastName }, idx, rateArr) => <div key={ idx }>{ `${firstName} ${lastName}` }</div>)
    )}
  </div>
);

export default graphql(ExchangeRateQuery, {
  options: ({ query, skip, limit }) => ({
    variables: { query, skip, limit }
  }),
  props: ({ data }) => {

    if (data.loading) {
      return {
        loading: data.loading
      };
    }
    
    if (data.error) {
      return {
        error: data.error
      };
    }

    return {
      loading: false,
      users: data.getUsers
    };
  }
})(ExchangeRateList);