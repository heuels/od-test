import { gql } from '@apollo/client'

export const QUERY = gql`
  query data($offset: Int, $feedType: String) {
    feed(offset: $offset, feedType: $feedType) {
      id
      title
      type
      fellowship
      body
      image_url
      created_ts
      projects {
        id
        name
        icon_url
      }
      users {
        id
      }
    }
  }
`
