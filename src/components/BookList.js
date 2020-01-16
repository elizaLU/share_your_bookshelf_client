import React, { Component } from "react";
import { gql } from "apollo-boost"; //parses JS into graphQL
import { graphql } from "react-apollo"; //binds query to component

//construct query and bind it in the component
const getBooksQuery = gql`
  {
    books {
      id
      title
      availability
      author {
        name
        surname
      }
      owner {
        name
      }
    }
  }
`;
class BookList extends Component {
  displayBooks() {
    const data = this.props.data;
    //the coolest easiest way to await data loading, and avoid the undefinced hell, I learned so far
    if (data.loading) {
      return <div>Loading books</div>;
    } else {
      return data.books.map(book => {
        return (
          <div key={book.id}>
            <li>Title: {book.title}</li>
            <p>{`by ${book.author.name}  ${book.author.surname}`}</p>
            <p>availability: {book.availability.toString()}</p>
            <p>Owner: {book.owner.name}</p>
          </div>
        );
      });
    }
  }
  render() {
    console.log("what are the props", this.props); //need to install CORS on express server
    return (
      <div>
        <h2>Shared Books</h2>
        <ol id="book-list">{this.displayBooks()}</ol>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
