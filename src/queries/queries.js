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
// const getOwnersQuery = gql`
//   {
//     owners {
//       id
//       name
//       surname
//     }
//   }
// `;

export { getBooksQuery, getAuthorsQuery };
