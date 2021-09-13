import Text from '@ui/text'
import Link from 'next/link'
import Label from '@ui/label'

import SmallItem from './smallItem'

import { CardType } from './types'

import styles from './card.module.css'

export type CardProps = {
  data: CardType
}

const Card: React.FC<UserProps> = ({
  data: { title, type, fellowship, body, image_url, created_ts },
}) => {
  return (
    <div className={styles.root}>
      <Label className={styles.fellowship}>
        {type} / {fellowship && <>{fellowship} /</>} {created_ts}
      </Label>
      <div className={styles.columns}>
        {image_url && (
          <div className={styles.left}>
            <img className={styles.img} src={image_url} />
          </div>
        )}
        <div className={image_url ? styles.right : ''}>
          <Text bold size="18" tagName="h2">
            {title}
          </Text>

          <Text markedText={body} />
        </div>
      </div>
    </div>
  )
}

export default Card
