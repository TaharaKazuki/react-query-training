import { useState } from 'react'
import PostDetail from './PostDetail'
import { isError, useQuery } from 'react-query'

const maxPostPage = 10

const fetchPosts = async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0'
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
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedPost, setSelectedPost] = useState<IData | null>(null)

  const { data, isError, error, isLoading } = useQuery<Array<IData>, Error>(
    'post',
    fetchPosts
  )
  if (isLoading) return <h3>Loading...</h3>
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
        <button disabled onClick={() => {}}>
          Previous Page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next Page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  )
}

export default Posts
