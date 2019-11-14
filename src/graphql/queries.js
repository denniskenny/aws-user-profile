/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const profileElement = `query ProfileElement {
  profileElement {
    userId
    user {
      id
      userId
      firstName
      lastName
      email
    }
  }
}
`;
export const getProfileElement = `query GetProfileElement($userId: String!) {
  getProfileElement(userId: $userId) {
    userId
    user {
      id
      userId
      firstName
      lastName
      email
    }
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
      userId
      user {
        id
        userId
        firstName
        lastName
        email
      }
    }
    nextToken
  }
}
`;
