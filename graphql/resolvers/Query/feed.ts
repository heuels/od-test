import db, { FeedItemRow } from '../../db'
import { FellowshipType } from 'types/enums'

const LIMIT = 5

type Args = {
  offset: number
  feedType: FellowshipType
}

export default async function feed(
  parent: unknown,
  { offset = 0, feedType = 'all' }: Args
): Promise<FeedItemRow[]> {
  let feedItems: FeedItemRow[] | undefined = []

  switch (feedType) {
    case 'writers':
      feedItems = await db.getAll(
        `SELECT announcements.id     as id,
       'Announcement'            as type,
        announcements.title      as title,
        announcements.fellowship as fellowship,
        announcements.body       as body,
        NULL                     as image_url,
        announcements.created_ts as created_ts 
        FROM announcements
        WHERE fellowship IN('all', 'writers')
        UNION ALL
        SELECT users.id      as id,
            'User'           as type,
            users.name       as title,
            users.fellowship as fellowship,
            users.bio        as body,
            users.avatar_url as image_url,
            users.created_ts as created_ts
        FROM users
        WHERE fellowship IN('writers', 'all')
        ORDER BY created_ts DESC
        LIMIT 5
        OFFSET ?`,
        [offset]
      )
      break

    case 'founders':
    case 'angels':
      feedItems = await db.getAll(
        `SELECT announcements.id as id,
       'Announcement'            as type,
        announcements.title      as title,
        announcements.fellowship as fellowship,
        announcements.body       as body,
        NULL                     as image_url,
        announcements.created_ts as created_ts 
        FROM announcements
        WHERE fellowship IN('all', ?)
        UNION ALL
        SELECT users.id      as id,
            'User'           as type,
            users.name       as title,
            users.fellowship as fellowship,
            users.bio        as body,
            users.avatar_url as image_url,
            users.created_ts as created_ts
        FROM users
        WHERE fellowship IN('founders', 'angels')
        UNION ALL
        SELECT DISTINCT projects.id as id,
                'Project'             as type,
                projects.name         as title,
                users.fellowship      as fellowship,
                projects.description  as body,
                projects.icon_url     as image_url,
                projects.created_ts   as created_ts
        FROM projects
                LEFT JOIN user_projects ON projects.id = user_projects.project_id
                LEFT JOIN users ON users.id = user_projects.user_id
        ORDER BY created_ts DESC
        LIMIT 5
        OFFSET ?`,
        [feedType, offset]
      )
      break

    default:
      feedItems = await db.getAll(
        `SELECT announcements.id as id,
       'Announcement'            as type,
        announcements.title      as title,
        announcements.fellowship as fellowship,
        announcements.body       as body,
        NULL                     as image_url,
        announcements.created_ts as created_ts 
        FROM announcements
        UNION ALL
        SELECT users.id      as id,
            'User'           as type,
            users.name       as title,
            users.fellowship as fellowship,
            users.bio        as body,
            users.avatar_url as image_url,
            users.created_ts as created_ts
        FROM users
        UNION ALL
        SELECT DISTINCT projects.id as id,
                'Project'             as type,
                projects.name         as title,
                users.fellowship      as fellowship,
                projects.description  as body,
                projects.icon_url     as image_url,
                projects.created_ts   as created_ts
        FROM projects
                LEFT JOIN user_projects ON projects.id = user_projects.project_id
                LEFT JOIN users ON users.id = user_projects.user_id
        ORDER BY created_ts DESC
        LIMIT 5
        OFFSET ?`,
        [offset]
      )
      break
  }

  if (!feedItems) {
    throw new Error(`FeedItems not found`)
  }

  return feedItems
}
