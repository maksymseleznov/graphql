import React, { Fragment } from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const ExchangeRateQuery = gql`
  query events ($query: UserQueryInput, $skip: Int, $limit: Int) {
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
  <Fragment>
    { loading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>{ `An error has occurred: ${error}` }</div>
    ) : (
      users.map(({ firstName, lastName }, idx, rateArr) => <div key={ idx }>{ `${firstName} ${lastName}` }</div>)
    )}
  </Fragment>
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