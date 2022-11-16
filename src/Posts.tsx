import type { FC } from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { PostDetail } from './PostDetail'

const MAX_POST_PAGE = 10

const fetchPosts = async (currentPage: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`
  ).then((res) => res.json())
  return response
}

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export const Posts = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const { data, isError, error, isLoading } = useQuery<Post[], Error>(
    ['post', currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
    }
  )
  if (isLoading) return <h3>Loading...</h3>
  if (isError)
    return (
      <h3>
        Error <p>{error.toString()}</p>{' '}
      </h3>
    )

  return (
    <>
      <ul>
        {data?.map((post) => (
          <li key={post.id} className="post-title" onClick={() => setSelectedPost(post)}>
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((prevPage) => prevPage - 1)
          }}
        >
          Previous Page
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled={currentPage >= MAX_POST_PAGE}
          onClick={() => {
            setCurrentPage((nextPage) => nextPage + 1)
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
