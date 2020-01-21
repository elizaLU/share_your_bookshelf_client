import { gql } from "apollo-boost"; //parses JS into graphQL

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

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
      surname
    }
  }
`;
const getOwnersQuery = gql`
  {
    owners {
      id
      name
      surname
    }
  }
`;

const addBookMutation = gql`
  mutation {
    addBook (
      title: "",
      genre: "",
      availability: true,
      authorId: "",
      ownerId: ""   
      ){
        title,
        genre,
        id

      }
  }
`;
//ownerId from the state
//should I use redux thunks for this?
//can I use redux thunks for apollo and graphQL?

export { getBooksQuery, getAuthorsQuery, getOwnersQuery, addBookMutation };
