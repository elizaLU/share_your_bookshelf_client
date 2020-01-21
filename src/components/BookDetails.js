import React, { Component } from "react";
import { graphql } from "react-apollo"; //binds query to component
import { getBookQuery } from "../queries/queries";
import { compose } from "redux";

class BookDetails extends Component {
  render() {
    // console.log("what are the props", this.props); //need to install CORS on express server
    return (
      <div id="book-detail">
        <h2>Book Details</h2>
      </div>
    );
  }
}

export default compose(graphql(getBookQuery, { name: "getBookQuery" }))(
  BookDetails
);
