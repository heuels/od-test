import Link from 'next/link'

import Text from '@ui/text'
import Label from '@ui/label'

import AdditionalInfo from './additionalInfo'

import { User } from './types'

import styles from './card.module.css'

export type UserProps = {
  data: User
  type: 'Page' | 'Listing'
}

const UserCard: React.FC<UserProps> = ({
  data: { id, avatar_url, name, fellowship, projects, bio, created_ts },
  type = 'Page',
}) => {
  return (
    <div className={styles.root}>
      <Label className={styles.fellowship}>
        user / {fellowship} / {created_ts}
      </Label>
      <div className={styles.columns}>
        <div className={styles.left}>
          <img className={styles.img} src={avatar_url} />
        </div>
        <div className={styles.right}>
          <Text bold size="18" tagName="h2">
            {name}
          </Text>

          <Text markedText={bio} />
          {!!projects.length && (
            <>
              <h3>Projects:</h3>
              {projects.map((item) => (
                <AdditionalInfo
                  key={item.id}
                  id={item.id}
                  url={item.icon_url}
                  name={item.name}
                  type="projects"
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserCard
