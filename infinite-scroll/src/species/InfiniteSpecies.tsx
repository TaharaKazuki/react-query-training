import InfiniteScroll from 'react-infinite-scroller'

import { Species } from './Species'

const initialUrl = 'https://swapi.dev/api/species'

const fetchUrl = async (url: string) => {
  const response = await fetch(url).then((res) => res.json())
  return response
}

export const InfiniteSpecies = () => {
  return <InfiniteScroll loadMore={() => fetchUrl(initialUrl)} />
}
