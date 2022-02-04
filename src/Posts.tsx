import { useState } from 'react'
import PostDetail from './PostDetail'

const fetchPosts = async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0'
  ).then((data) => data.json())

  return response
}

interface IData {
  id: string
  title: string
}

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedPost, setSelectedPost] = useState<IData | null>(null)

  const data: Array<IData> = []

  return (
    <>
      <ul>
        {data.map((post) => (
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
        <span></span>
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
