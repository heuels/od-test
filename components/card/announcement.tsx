import Text from '@ui/text'
import Label from '@ui/label'
import Link from 'next/link'

import SmallItem from './smallItem'

import styles from './card.module.css'

import { Announcement } from './types'

export type AnnouncementProps = {
  data: Announcement
  type: 'Page' | 'Listing'
}

const AnnouncementCard: React.FC<AnnouncementProps> = ({
  data: { id, fellowship, title, body, created_ts },
  type = 'Page',
}) => {
  return (
    <div className={styles.root}>
      <Label className={styles.fellowship}>
        announcement / {fellowship} / {created_ts}
      </Label>
      <Text bold size="18" tagName="h2">
        {title}
      </Text>
      <Text markedText={body} />
    </div>
  )
}

export default AnnouncementCard
