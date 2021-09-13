import db, { UserRow, ProjectRow, FeedItemRow, AnnouncementRow } from '../../db'

import { user, project, announcement } from '../Query'

type ItemRow = UserRow | ProjectRow | FeedItemRow | AnnouncementRow | null

export default async function feedItems(
  feedItem: FeedItemRow
): Promise<ItemRow> {
  console.log('====================')
  const { type, id } = feedItem
  let item: ItemRow = null

  switch (type) {
    case 'User':
      item = await user(null, { id: feedItem.id })
      break

    case 'Project':
      item = await project(null, { id: feedItem.id })
      break

    case 'Announcement':
      item = await announcement(null, { id: feedItem.id })
      break

    default:
      break
  }

  return item
}
