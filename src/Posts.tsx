import type { FC } from 'react'
import { useState } from 'react'

const MAX_POST_PAGE = 10

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0').then(
    (res) => res.json()
  )
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

  const data: Post[] = []

  return (
    <>
      <ul>
        {data.map((post) => (
          <li key={post.id} className="post-title" onClick={() => setSelectedPost(post)}>
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
      {selectedPost}
    </>
  )
}
