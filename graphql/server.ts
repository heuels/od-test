import { ApolloServer, gql } from 'apollo-server-micro'
import * as resolvers from './resolvers'

const typeDefs = gql`
  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    users: [User!]!
    created_ts: String!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    created_ts: String!
    projects: [Project!]!
  }

  type Announcement {
    id: Int!
    fellowship: String!
    title: String!
    body: String!
    created_ts: String!
  }

  union FeedItem = Announcement | User | Project

  type Feed {
    id: Int!
    type: String!
    created_ts: String!
    additionalFields: FeedItem
  }

  type Query {
    project(id: Int!): Project!
    user(id: Int!): User!
    announcement(id: Int!): Announcement!
    feed(offset: Int, feedType: String): [Feed!]!
  }
`

export const server = new ApolloServer({ typeDefs, resolvers })
