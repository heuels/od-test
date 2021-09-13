export type Fellowship = 'all' | 'founders' | 'angels' | 'writers'
export type Compone

export type Project = {
  id: number
  name: string
  description: string
  icon_url: string
  users: User[]
  created_ts: Date
}

export type Announcement = {
  id: number
  fellowship: Fellowship
  title: string
  body: string
  created_ts: Date
}

export type User = {
  id: number
  avatar_url: string
  name: string
  fellowship: Fellowship
  bio: string
  projects: Project[]
  created_ts: Date
}

export type CardType = {
  title: string
  type: 'Announcement' | 'Project' | 'User'
  fellowship: Fellowship
  body: string
  image_url: string
  created_ts: Date
}
