import React, { Component } from "react";
import { graphql } from "react-apollo"; //binds query to component
import { getBookQuery } from "../queries/queries";
import { compose } from "redux";

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.getBookQuery;
    if (book) {
      return (
        <div>
          <h2>{book.title}</h2>
          <p>
            {book.author.name} {book.author.surname}
          </p>
          <h3>Other books by this author:</h3>
          <ul className="other-books">
            {book.author.works.map(work => {
              return <li key={work.id}>{work.title}</li>;
            })}
          </ul>
        </div>
      );
    }
  }
  render() {
    console.log("what are the props", this.props.getBookQuery.book); //need to install CORS on express server

    return (
      <div id="book-detail">
        <h2>Book Details</h2>
        {this.displayBookDetails()}
      </div>
    );
  }
}

export default compose(
  graphql(getBookQuery, {
    name: "getBookQuery",
    //whenever props.bookId updates - this function will call getBookQuery with selected ID variable
    options: props => {
      return {
        variables: {
          id: props.bookId
        }
      };
    }
  })
)(BookDetails);
