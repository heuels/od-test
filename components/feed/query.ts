import { gql } from '@apollo/client'

export const QUERY = gql`
  query data($offset: Int, $feedType: String) {
    feed(offset: $offset, feedType: $feedType) {
      id
      type
      additionalFields {
        ... on Announcement {
          title
          body
          fellowship
          created_ts
        }
        ... on Project {
          title: name
          body: description
          image_url: icon_url
          created_ts
          users {
            id
            name
            image_url: avatar_url
          }
        }
        ... on User {
          title: name
          body: bio
          fellowship
          image_url: avatar_url
          created_ts
          projects {
            id
            name
            image_url: icon_url
          }
        }
      }
    }
  }
`
