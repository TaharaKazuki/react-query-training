import React, { FC } from 'react'
import { IData } from './Posts'

const fetchComments = async (postId: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  ).then((data) => data.json())
  return response
}

const deletePost = async (postId: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'DELETE' }
  ).then((data) => data.json())
  return response
}

const updatePost = async (postId: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'PATCH' }
  ).then((data) => data.json())
  return response
}

interface IPostDetail {
  post: IData
}

interface IDetailData {
  id: string
  email: string
  body: string
}

const PostDetail: FC<IPostDetail> = ({ post }) => {
  const data: Array<IDetailData> = []

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button>Delete</button> <button>Updata title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email} {comment.body}
        </li>
      ))}
    </>
  )
}

export default PostDetail
