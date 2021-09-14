import db, { ItemRow } from '../../db'

export function __resolveType(data: ItemRow): string | null {
  console.log('=======', data.type, data.id)
  return data.type || null
}
