import React, { FC, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import { QUERY } from './query'

import { QueryData, QueryVariables } from './types'

import Loader from '@ui/loader'
import Layout from 'components/layout'
import Card from 'components/card'

import { fellowships } from './constants'

import styles from './feed.module.css'

import { Fellowship } from 'components/card/types'

const Feed: FC<{ initial?: number }> = ({ initial = 0 }) => {
  const [feedType, setFeedType] = useState<string>('all')
  const [feedState, setFeedState] = useState<feedStateType>({
    offset: 0,
    hasMore: true,
  })

  const { offset, hasMore } = feedState
  const { query } = useRouter()
  const { data, error, loading, fetchMore } = useQuery<
    QueryData,
    QueryVariables
  >(QUERY, {
    variables: {
      offset: 0,
      feedType: feedType,
    },
  })

  if (loading) return <Loader centered />
  if (!data || error) {
    return null
  }
  const { feed } = data

  return (
    <>
      <InfiniteScroll
        dataLength={feed.length}
        next={() =>
          fetchMore({
            variables: {
              offset: feed.length,
              feedType: feedType,
            },
          }).then((res) => {
            setFeedState({
              offset: offset + res.data.feed.length,
              hasMore: res.data.feed.length !== 0,
            })
          })
        }
        hasMore={hasMore}
        loader={<Loader centered />}
        scrollableTarget="scrollableDiv"
      >
        <form className={styles.form}>
          <select
            onChange={(e) => {
              setFeedType(e.target.value)
              setFeedState({
                offset: 0,
                hasMore: true,
              })
            }}
          >
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
          return <Card key={key} data={item} />
        })}
      </InfiniteScroll>
    </>
  )
}

export default Feed
