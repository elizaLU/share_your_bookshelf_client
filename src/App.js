import React from "react";
import BookList from "./components/BookList";
import AddBookForm from "./components/AddBookForm";
import ApolloClient from "apollo-boost";
//data gotten from endpoint will be provided inside the ApolloProvider
import { ApolloProvider } from "react-apollo";
//setup apollo clients
const client = new ApolloClient({
  //enpoint for all queries
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Bookshelf</h1>
        <AddBookForm />
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
