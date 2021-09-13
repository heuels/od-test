import { gql } from '@apollo/client'

export const QUERY = gql`
  query data($offset: Int, $feedType: String) {
    feed(offset: $offset, feedType: $feedType) {
      title
      type
      fellowship
      body
      image_url
      created_ts
      # projects {
      #   id
      # }
      # users {
      #   id
      # }
    }
  }
`
