import db, { FeedItemRow } from '../../db'
import { FellowshipType } from 'types/enums'

const LIMIT = 5

type Args = {
  LIMIT: number
  offset: number
  before: string
  feedType: FellowshipType
}

function getFilterByType(type: FellowshipType): string {
  switch (type) {
    case 'founders':
    case 'angels':
      return `WHERE fellowship IN('founders', 'angels', 'all')`
      break

    case 'writers':
      return `WHERE fellowship IN('writers', 'all')`
      break

    default:
      return ''
      break
  }
}

export default async function feed(
  parent: unknown,
  { offset = 0, feedType = 'all' }: Args
): Promise<FeedItemRow[]> {
  let feedItems: FeedItemRow[] | undefined = []

  const projects =
    feedType !== 'writers'
      ? `UNION ALL
SELECT DISTINCT projects.id as id,
       'Project'            as type,
       projects.name        as title,
       users.fellowship     as fellowship,
       projects.description as body,
       projects.icon_url    as image_url,
       projects.created_ts  as created_ts
FROM projects
         LEFT JOIN user_projects ON projects.id = user_projects.project_id
         LEFT JOIN users ON users.id = user_projects.user_id
`
      : ''

  feedItems = await db.getAll(
    `SELECT announcements.id as id,
       'Announcement' as type,
        announcements.title as title,
        announcements.fellowship as fellowship,
        announcements.body as body,
        NULL           as image_url,
        announcements.created_ts as created_ts 
        FROM announcements
        ${getFilterByType(feedType)}
        UNION ALL
        SELECT users.id as id,
            'User'     as type,
            users.name       as title,
            users.fellowship as fellowship,
            users.bio        as body,
            users.avatar_url as image_url,
            users.created_ts as created_ts
        FROM users
        ${getFilterByType(feedType)}
        ${projects}
        ORDER BY created_ts DESC
          LIMIT 5
        OFFSET ?`,
    [offset]
  )

  if (!feedItems) {
    throw new Error(`FeedItems not found`)
  }

  return feedItems
}
