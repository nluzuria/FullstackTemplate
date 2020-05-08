// import gql from "graphql-tag";
import { gql } from "apollo-boost";

const getPostsQuery = gql`
  query {
    blogPosts {
      id
      title
      slug
    }
  }
`;

const getPostQuery = gql`
  query($id: ID) {
    blogPost(id: $id) {
      id
      title
      slug
      html
    }
  }
`;

export { getPostsQuery, getPostQuery };
