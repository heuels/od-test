export type Fellowships = 'founders' | 'angels' | 'writers' | 'all'
export type AnnouncementType = {
  id: number
  type: 'Announcement'
  fellowship: Fellowships
  title: string
  body: string
  created_ts: Date
}

export type ProjectType = {
  id: number
  name: string
  type: 'Project'
  description: string
  icon_url: string
  created_ts: Date
  users: User[]
}

export type UserType = {
  id: number
  name: string
  type: 'User'
  bio: string
  avatar_url: string
  fellowship: string
  created_ts: Date
}

export type QueryData = {
  feed: FeedItem[]
}

type QueryVariables = {
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
