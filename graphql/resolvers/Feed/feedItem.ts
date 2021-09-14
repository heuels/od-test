import db, { ItemRow } from '../../db'

export function __resolveType(data: ItemRow): string | null {
  return data.type || null
}
