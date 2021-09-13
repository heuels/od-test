import db, { FeedItemRow } from '../../db'
import { FellowshipType } from 'types/enums'

const LIMIT = 5

type Args = {
  LIMIT: number
  offset: number
  before: string
  feedType: FellowshipType
}

export default async function feedItems(
  parent: unknown,
  { LIMIT: LIMIT, offset = 0, feedType = 'all' }: Args
): Promise<FeedItemRow[]> {
  let feedItems: FeedItemRow[] | undefined = []

  switch (feedType) {
    case 'writers':
      feedItems = await db.getAll(
        `
      SELECT 
        id, 
        'Announcement' as type, 
        title, 
        fellowship, 
        body, 
        NULL as image_url,
        created_ts
        FROM announcements WHERE fellowship == 'writers' OR fellowship == 'all'
        UNION ALL 
        SELECT 
            id, 
            'User' as type,
            name as title, 
            fellowship, 
            bio as body,
            avatar_url as image_url,
            created_ts
        FROM users WHERE fellowship == 'writers'
        UNION ALL 
        SELECT 
            id, 
            'Project' as type,
            name as title, 
            NULL as fellowship, 
            description as body, 
            icon_url as image_url, 
            created_ts
        FROM projects WHERE fellowship == 'writers'
        ORDER BY created_ts DESC 
        LIMIT 5 OFFSET ?
      `,
        [LIMIT, offset]
      )
      break

    case 'founders':
    case 'angels':
      feedItems = await db.getAll(
        `
      SELECT 
            id, 
            'Announcement' as type, 
            title, 
            fellowship, 
            body, 
            NULL as image_url,
            created_ts
        FROM announcements WHERE fellowship == 'founders' OR fellowship == 'angels' OR fellowship == 'all'
        UNION ALL 
        SELECT 
            id, 
            'User' as type,
            name as title, 
            fellowship, 
            bio as body,
            avatar_url as image_url,
            created_ts
        FROM users WHERE fellowship == 'founders' OR fellowship == 'angels'
        UNION ALL 
        SELECT 
            id, 
            'Project' as type,
            name as title, 
            NULL as fellowship, 
            description as body, 
            icon_url as image_url, 
            created_ts
        FROM projects WHERE fellowship == 'founders' OR fellowship == 'angels'
        ORDER BY created_ts DESC 
        LIMIT 5 OFFSET ?
      `,
        [LIMIT, offset]
      )
      break

    default:
      feedItems = await db.getAll(
        `
      SELECT 
            id, 
            'Announcement' as type, 
            title, 
            fellowship, 
            body, 
            NULL as image_url,
            created_ts
        FROM announcements
        UNION ALL 
        SELECT 
            id, 
            'User' as type,
            name as title, 
            fellowship, 
            bio as body,
            avatar_url as image_url,
            created_ts
        FROM users
        UNION ALL 
        SELECT 
            id, 
            'Project' as type,
            name as title, 
            NULL as fellowship, 
            description as body, 
            icon_url as image_url, 
            created_ts
        FROM projects 
        ORDER BY created_ts DESC 
        LIMIT 5 OFFSET ?
      `,
        [LIMIT, offset]
      )
      break
  }

  if (!feedItems) {
    throw new Error(`FeedItems not found`)
  }
  return feedItems
}
