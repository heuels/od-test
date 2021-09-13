export type AnnouncementType = {
  id: number
  fellowship: 'founders' | 'angels' | 'writers' | 'all'
  title: string
  body: string
  created_ts: Date
}

export type ProjectType = {
  id: number
  name: string
  description: string
  icon_url: string
  created_ts: Date
  users: User[]
}

export type UserType = {
  id: number
  name: string
  bio: string
  avatar_url: string
  fellowship: string
  created_ts: Date
}

export type QueryData = {
  feed: FeedItem[]
}

type QueryVars = {
  offset: number
  feedType: string
}

type FeedItem = {
  title: string
  type: 'Announcement' | 'Project' | 'User'
  fellowship: Fellowship
  body: string
  image_url: string
  created_ts: Date
}
