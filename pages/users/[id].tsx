import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'

import Layout from 'components/layout'
import UserCard from 'components/card/user'

import Loader from '@ui/loader'

const USER_QUERY = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      name
      bio
      fellowship
      avatar_url
      projects {
        id
        name
        icon_url
      }
    }
  }
`

type QueryData = {
  user: User
}

type QueryVars = {
  id: number
}

type User = {
  id: number
  name: string
  bio: string
  fellowship: 'fellows' | 'angels' | 'writers'
  avatar_url: string
  projects: Project[]
}

type Project = {
  id: number
  name: string
  icon_url: string
}

export default function UserPage() {
  const { query } = useRouter()

  const { data, error, loading } = useQuery<QueryData, QueryVars>(USER_QUERY, {
    skip: !query.id,
    variables: { id: Number(query.id) },
  })
  const user = data?.user

  if (loading) return <Loader centered />

  if (!user || error) {
    return null
  }

  return (
    <Layout>
      <UserCard data={user} />
    </Layout>
  )
}
