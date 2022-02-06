import { useEffect, useState } from 'react'
import PostDetail from './PostDetail'
import { useQuery, useQueryClient } from 'react-query'

const maxPostPage = 10

const fetchPosts = async (pageNum: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  ).then((data) => data.json())

  return response
}

export interface IData {
  userId: number
  id: number
  title: string
  body: string
}

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPost, setSelectedPost] = useState<IData | null>(null)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1
      queryClient.prefetchQuery(['posts', nextPage], () => fetchPosts(nextPage))
    }
  }, [currentPage, queryClient])

  const { data, isError, error, isLoading, isFetching } = useQuery<
    Array<IData>,
    Error
  >(['post', currentPage], () => fetchPosts(currentPage), {
    staleTime: 2000,
    keepPreviousData: true,
  })
  if (isFetching) return <h3>Loading...</h3>
  if (isError)
    return (
      <>
        <h3>Opps, something went wrong</h3>
        {error && <p>{error.toString()}</p>}
      </>
    )

  return (
    <>
      <ul>
        {data!.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue - 1)
          }}
        >
          Previous Page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue + 1)
          }}
        >
          Next Page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  )
}

export default Posts
