/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserProfileElement = `subscription OnCreateUserProfileElement(
  $userId: String
  $contentRecommendationFreq: String
  $personalDevelopmentFrequency: String
  $language: String
) {
  onCreateUserProfileElement(
    userId: $userId
    contentRecommendationFreq: $contentRecommendationFreq
    personalDevelopmentFrequency: $personalDevelopmentFrequency
    language: $language
  ) {
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
export const onUpdateUserProfileElement = `subscription OnUpdateUserProfileElement(
  $userId: String
  $contentRecommendationFreq: String
  $personalDevelopmentFrequency: String
  $language: String
) {
  onUpdateUserProfileElement(
    userId: $userId
    contentRecommendationFreq: $contentRecommendationFreq
    personalDevelopmentFrequency: $personalDevelopmentFrequency
    language: $language
  ) {
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
export const onDeleteUserProfileElement = `subscription OnDeleteUserProfileElement(
  $userId: String
  $contentRecommendationFreq: String
  $personalDevelopmentFrequency: String
  $language: String
) {
  onDeleteUserProfileElement(
    userId: $userId
    contentRecommendationFreq: $contentRecommendationFreq
    personalDevelopmentFrequency: $personalDevelopmentFrequency
    language: $language
  ) {
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
