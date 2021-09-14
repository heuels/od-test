import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'

import Loader from '@ui/loader'

import Layout from 'components/layout'
import Card from 'components/card'

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

  const { id, fellowship, title, body, created_ts } = announcement
  return (
    <Layout showBackLink>
      <Card
        id={id}
        type="Project"
        data={{
          title: title,
          body: body,
          fellowship: fellowship,
          created_ts: created_ts,
        }}
      />
    </Layout>
  )
}
