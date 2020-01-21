import React, { Component } from "react";
import { graphql } from "react-apollo"; //binds query to component
import { getAuthorsQuery } from "../queries/queries";

class AddBookForm extends Component {
  displayAuthors() {
    //console.log("what's up authors", this.props);
    //data is attached to props when we bind the query to the component
    const data = this.props.data;
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
  //I cannot combine multiple queries with neither, combine, lodash apollo hooks etc. very frustrating.
  //I will make the logged in user as the default owner of the book instead and remove owner filed from the form here :<
  displayOwners() {
    console.log("what's up owners", this.props); //returns authors as well, check if two queries can be made from one component.graphql(methods) - only one?
    //data is attached to props when we bind the query to the component
    const data = this.props.data;
    //the coolest easiest way to await data loading, and avoid the undefinced hell, I learned so far
    if (data.loading) {
      return <option disabled>Loading owners</option>;
    } else {
      return data.owners.map(owner => {
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
        <form>
          <div className="field">
            <label>Book title</label>
            <input type="text"></input>
          </div>
          <div className="field">
            <label>Author</label>
            <select>
              <option>Select Author</option>
              {this.displayAuthors()}
            </select>
          </div>
          <div className="field">
            <label>Genre</label>
            <input type="text"></input>
          </div>

          {/* <div className="field">
            <label>Owner</label>
            <select>
              <option>Select Owner</option>
              {this.displayOwners()} 
            </select> 
          </div>*/}

          <div className="field">
            <label htmlFor="true">available</label>
            <input
              type="radio"
              name="availability"
              value="available"
              defaultChecked
            />
            <br />
            <label htmlFor="false">unavailable</label>
            <input type="radio" name="availability" value="unavailable" />
            <br />
          </div>
          <button type="submit">ADD BOOK</button>
        </form>
      </div>
    );
  }
}

export default graphql(getAuthorsQuery, 
  // getOwnersQuery
  )
  (AddBookForm);
