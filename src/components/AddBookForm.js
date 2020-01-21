import React, { Component } from "react";
import { graphql } from "react-apollo"; //binds query to component
import {
  getAuthorsQuery,
  getOwnersQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";
import { compose } from "redux";

class AddBookForm extends Component {
  state = {
    title: "",
    genre: "",
    availability: true,
    authorId: "",
    ownerId: ""
    //userId: this.props.user.userId,
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.addBookMutation({
      //query variables to the mutation
      variables: {
        title: this.state.title,
        genre: this.state.genre,
        availability: JSON.parse(this.state.availability),
        authorId: this.state.authorId,
        ownerId: this.state.ownerId
      },
      //refetch Book list after adding a book
      refetchQueries: [{ query: getBooksQuery }]
    });

    this.setState({
      title: "",
      genre: "",
      authorId: "",
      ownerId: ""
    });
  };

  displayAuthors() {
    //console.log("what's up authors", this.props);
    //data is attached to props when we bind the query to the component
    const data = this.props.getAuthorsQuery;
    //the coolest easiest way to await data loading, and avoid the undefinced hell, I learned so far
    if (data.loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option
            key={author.id}
            value={author.id}
          >{`${author.name} ${author.surname}`}</option>
        );
      });
    }
  }

  displayOwners() {
    const ownerData = this.props.getOwnersQuery;
    if (ownerData.loading) {
      return <option disabled>Loading owners</option>;
    } else {
      return ownerData.owners.map(owner => {
        return (
          <option
            key={owner.id}
            value={owner.id}
          >{`${owner.name} ${owner.surname}`}</option>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <h2>Add your books here</h2>
        <form onSubmit={this.onSubmit}>
          <div className="field">
            <label>Book title</label>
            <input
              type="text"
              value={this.state.title}
              name="title"
              onChange={this.onChange}
            ></input>
          </div>
          <div className="field">
            <label>Author</label>
            <select
              name="authorId"
              value={this.state.authorId}
              onChange={this.onChange}
            >
              <option>Select Author</option>
              {this.displayAuthors()}
            </select>
          </div>
          <div className="field">
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              value={this.state.genre}
              onChange={this.onChange}
            ></input>
          </div>

          <div className="field">
            <label>Owner</label>
            <select
              name="ownerId"
              value={this.state.ownerId}
              onChange={this.onChange}
            >
              <option>Select Owner</option>
              {this.displayOwners()}
            </select>
          </div>

          <div className="field">
            <label htmlFor="true">available</label>
            <input
              type="radio"
              name="availability"
              value={this.state.availability}
              onChange={this.onChange}
            />
            <br />
            <label htmlFor="false">unavailable</label>
            <input
              type="radio"
              name="availability"
              value={!this.state.availability}
              onChange={this.onChange}
            />
            <br />
          </div>
          <button type="submit">ADD BOOK</button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" }),
  graphql(getOwnersQuery, { name: "getOwnersQuery" })
)(AddBookForm);
