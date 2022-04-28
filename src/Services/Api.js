import ApolloClient from 'apollo-client';
import { GraphQLNormalizr } from 'graphql-normalizr';
import { gql } from "apollo-boost";

var urlConfig = require ('../UrlConfig')


// Create the apollo client
const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io'
  });

  client
  .query({
    query: gql`
      {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => console.log(result));