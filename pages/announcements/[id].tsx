import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'

import Loader from '@ui/loader'

import Layout from 'components/layout'

const ANNOUNCEMENT_QUERY = gql`
  query announcement($id: Int!) {
    announcement(id: $id) {
      id
      fellowship
      title
      body
    }
  }
`

type QueryData = {
  announcement: Announcement
}

type QueryVars = {
  id: number
}

type Announcement = {
  id: number
  fellowship: 'founders' | 'angels' | 'writers' | 'all'
  title: string
  body: string
}

export default function AnnouncementPage() {
  const { query } = useRouter()

  const { data, error, loading } = useQuery<QueryData, QueryVars>(
    ANNOUNCEMENT_QUERY,
    {
      skip: !query.id,
      variables: { id: Number(query.id) },
    }
  )

  const announcement = data?.announcement

  if (loading) return <Loader centered />

  if (!announcement || error) {
    return null
  }

  const { body, fellowship, title } = announcement

  return (
    <Layout showBackLink>
      {title}
      {body}
      {fellowship}
    </Layout>
  )
}
