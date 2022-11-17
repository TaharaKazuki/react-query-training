import InfiniteScroll from 'react-infinite-scroller'

import { Person } from './Person'

const initialUrl = 'https://swapi.dev/api/people'

const fetchUrl = async (url: string) => {
  const response = await fetch(url).then((res) => res.json())
  return response
}

export const InfinitePeople = () => {
  return <InfiniteScroll loadMore={() => fetchUrl(initialUrl)} />
}
