export type Fellowship = 'all' | 'founders' | 'angels' | 'writers'
export type ComponentType = 'Announcement' | 'Project' | 'User'

export type Project = {
  id: number
  name: string
  description: string
  image_url: string
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
  image_url: string
  name: string
  fellowship: Fellowship
  bio: string
  projects: Project[]
  created_ts: Date
}

export type CardType = {
  id: number
  type: ComponentType
  data: {
    title: string
    fellowship: Fellowship
    body: string
    image_url: string
    created_ts: Date
    projects: Project[]
    users: User[]
  }
}

export type CardComponentProps = CardType & {
  componentPlace: 'listing' | 'page'
}
