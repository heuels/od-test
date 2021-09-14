import db, { ItemRow } from '../../db'

import { user, project, announcement } from '../Query'

export default async function additionalFields(
  itemRow: ItemRow
): Promise<Item> {
  const { type, id } = itemRow
  let item = null
  const props = { id: id }

  switch (type) {
    case 'User':
      try {
        item = await user(null, props)
      } catch (err) {
        console.log(err)
      }
      break

    case 'Project':
      try {
        item = await project(null, props)
      } catch (err) {
        console.log(err)
      }
      break

    case 'Announcement':
      try {
        item = await announcement(null, props)
      } catch (err) {
        console.log(err)
      }
      break

    default:
      return null
      break
  }

  if (item) {
    item.type = type
  } else {
    throw new Error(`feed item not found`)
  }

  return item
}
