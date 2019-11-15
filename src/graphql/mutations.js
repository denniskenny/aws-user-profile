/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserProfileElement = `mutation CreateUserProfileElement($input: CreateUserProfileElementInput!) {
  createUserProfileElement(input: $input) {
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
export const updateUserProfileElement = `mutation UpdateUserProfileElement($input: UpdateUserProfileElementInput!) {
  updateUserProfileElement(input: $input) {
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
export const deleteUserProfileElement = `mutation DeleteUserProfileElement {
  deleteUserProfileElement {
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
