
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'
const http = new HttpLink({ uri: "http://127.0.0.1:8000/graphql/" });
const delay = setContext(
  request => 
    new Promise((success, fail) => {
      setTimeout(() => {
        success()
      }, 800)
    })
)
const link = ApolloLink.from([
  delay,
  http
])
const cache = new InMemoryCache()
const client = new ApolloClient({
    link,
    cache,
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
            console.log('This is a graphQL error!'),
        );
      }
      if (networkError) {
        console.log('This is a Network Error!', networkError);
        console.log('Can be called from a query error in the browser code!');
      }
    }
})

export default client;