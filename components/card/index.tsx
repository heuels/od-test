import Text from '@ui/text'
import Link from 'next/link'
import Label from '@ui/label'

import SmallItem from './additionalInfo'

import { CardComponentProps } from './types'

import styles from './card.module.css'

const Card: React.FC<CardComponentProps> = ({
  id,
  title,
  type,
  fellowship,
  body,
  image_url,
  created_ts,
  componentPlace = 'page',
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
            {componentPlace === 'page' ? (
              { title }
            ) : (
              <Link href={`${type}/${id}`}>{title}</Link>
            )}
          </Text>

          <Text markedText={body} />
        </div>
      </div>
    </div>
  )
}

export default Card
