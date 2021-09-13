import Head from 'next/head'
import Link from 'next/link'
import Layout from 'components/layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>

      <ul>
        <li>
          Project <Link href="/projects/10">Blue Onion Labs</Link>
        </li>
        <li>
          User <Link href="/users/11">Cai Burris</Link>
        </li>
      </ul>
    </Layout>
  )
}
