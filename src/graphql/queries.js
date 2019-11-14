/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfileElement = `query GetProfileElement($name: String!, $user: String!) {
  getProfileElement(name: $name, user: $user) {
    id
    name
    user
    value
  }
}
`;
export const listProfileElements = `query ListProfileElements(
  $filter: TableProfileElementFilterInput
  $limit: Int
  $nextToken: String
) {
  listProfileElements(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      user
      value
    }
    nextToken
  }
}
`;
export const singlePost = `query SinglePost($id: ID!) {
  singlePost(id: $id) {
    id
    title
  }
}
`;
