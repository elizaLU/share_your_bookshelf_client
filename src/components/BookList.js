import React, { Component } from "react";
import { graphql } from "react-apollo"; //binds query to component
import { getBooksQuery } from "../queries/queries";
import { compose } from "redux";
import BookDetails from "./BookDetails";

class BookList extends Component {
  state = {
    selected: null
  };
  displayBooks() {
    //console.log(this.props);
    //data is attached to props when we bind the query to the component
    const data = this.props.getBooksQuery;
    //the coolest   easiest way to await data loading, and avoid the undefinced hell, I learned so far
    if (data.loading) {
      return <div>Loading books</div>;
    } else {
      return data.books.map(book => {
        return (
          <div
            key={book.id}
            onClick={e => {
              this.setState({ selected: book.id });
            }}
          >
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
    // console.log("what are the props", this.props); //need to install CORS on express server
    return (
      <div>
        <h2>Shared Books</h2>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default compose(graphql(getBooksQuery, { name: "getBooksQuery" }))(
  BookList
);
