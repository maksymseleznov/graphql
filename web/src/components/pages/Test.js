import React from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// const ExchangeRateQuery = gql`
//   query rates($currency: String!) {
//     rates(currency: $currency) {
//       currency
//       rates {
//         currency
//         rate
//       }
//     }
//   }
// `;

const ExchangeRateQuery = gql`
  query {
    getUsers {
      id
    }
  }
`;

const ExchangeRateList = ({
  currency: currentCurrency,
  onCurrencyChange,
  rates,
  loading
}) => (
  <div>
    { loading ? (
      <div>Loading...</div>
    ) : (
      rates.map(({ currency, rate }, idx, rateArr) => <div>{rate} - {currency}</div>)
    )}
  </div>
);

export default graphql(ExchangeRateQuery, {
  options: ({ currency }) => ({
    variables: { currency }
  }),
  props: ({ data }) => {
    console.log("test", data);
    if (data.loading) {
      return {
        loading: data.loading
      };
    }

    return {
      loading: false,
      rates: data.rates.rates
    };
  }
})(ExchangeRateList);