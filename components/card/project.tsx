import Link from 'next/link'

import Text from '@ui/text'
import Label from '@ui/label'

import SmallItem from './smallItem'

import { Project } from './types'

import styles from './card.module.css'
import SmallItem from './smallItem'

export type ProjectProps = {
  data: Project
  type: 'Page' | 'Listing'
}

const ProjectCard: React.FC<ProjectProps> = ({
  data: { id, icon_url, name, description, users, created_ts },
}) => {
  return (
    <div className={styles.root}>
      <Label className={styles.fellowship}>project / {created_ts}</Label>
      <div className={styles.columns}>
        <div className={styles.left}>
          <img src={icon_url} />
        </div>

        <div className={styles.right}>
          <Text bold size="18" tagName="h2">
            {name}
          </Text>

          <Text markedText={description} />
          {!!users.length && (
            <>
              <h3>Participants:</h3>
              {users.map((item) => (
                <SmallItem
                  key={item.id}
                  id={item.id}
                  url={item.avatar_url}
                  name={item.name}
                  type="users"
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
