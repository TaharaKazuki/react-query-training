import type { Post } from './Posts'
import type { FC } from 'react'

type Comment = Post & {
  email: string
}

type Props = {
  post: Post
}

const fetchComments = async (postId: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  ).then((res) => res.json())
  return response
}

const deletePost = async (postId: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'DELETE',
  }).then((res) => res.json())
  return response
}

const updatePost = async (postId: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'PATCH',
  }).then((res) => res.json())
  return response
}

export const PostDetail: FC<Props> = ({ post }) => {
  const data: Comment[] = []

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}:{comment.body}
        </li>
      ))}
    </>
  )
}
