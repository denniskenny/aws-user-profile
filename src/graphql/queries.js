/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const userProfileElement = `query UserProfileElement {
  userProfileElement {
    userId
    userAccountInfo {
      id
      userId
      firstName
      lastName
      email
    }
    contentRecommendationFreq
    personalDevelopmentFrequency
    language
  }
}
`;
export const getUserProfileElement = `query GetUserProfileElement {
  getUserProfileElement {
    userId
    userAccountInfo {
      id
      userId
      firstName
      lastName
      email
    }
    contentRecommendationFreq
    personalDevelopmentFrequency
    language
  }
}
`;
export const listUserProfileElements = `query ListUserProfileElements(
  $filter: TableUserProfileElementFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserProfileElements(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      userId
      userAccountInfo {
        id
        userId
        firstName
        lastName
        email
      }
      contentRecommendationFreq
      personalDevelopmentFrequency
      language
    }
    nextToken
  }
}
`;
