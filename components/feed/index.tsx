import React, { FC, useState } from 'react'

import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import { QUERY } from './query'

import { QueryData } from './types'

import Loader from '@ui/loader'
import Layout from 'components/layout'
import Card from 'components/card'

import { fellowships } from './constants'

import styles from './feed.module.css'

import { Fellowship } from 'components/card/types'

const Feed: FC<{ initial?: number }> = ({ initial = 0 }) => {
  const [feedType, setFeedType] = useState<string>('all')
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const { query } = useRouter()
  const { data, error, loading, fetchMore, onLoadMore } = useQuery<QueryData>(
    QUERY,
    {
      variables: {
        offset: 0,
        feedType: feedType,
      },
    }
  )

  if (loading) return <Loader centered />
  if (!data || error) {
    return null
  }

  const { feed } = data
  console.log(feed)

  return (
    <>
      <form className={styles.form}>
        <select onChange={(e) => setFeedType(e.target.value)}>
          {fellowships.map((item, key) => {
            return (
              <option key={key} value={item}>
                {item}
              </option>
            )
          })}
        </select>
      </form>

      {feed.map((item, key) => {
        return (
          <Card
            key={key}
            data={item}
            onLoadMore={async () => {
              setIsLoadingMore(true)
              await fetchMore({
                variables: {
                  offset: feed.length,
                },
              })
              setIsLoadingMore(false)
            }}
          />
        )
      })}
      {isLoadingMore && <Loader />}
      <div
        onClick={async () => {
          setIsLoadingMore(true)
          await fetchMore({
            variables: {
              offset: feed.length,
            },
          })
          setIsLoadingMore(false)
        }}
      >
        Load More
      </div>
    </>
  )
}

export default Feed
