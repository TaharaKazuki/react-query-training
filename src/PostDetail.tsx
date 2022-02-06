import React, { FC } from 'react'
import { IData } from './Posts'
import { useQuery } from 'react-query'

const fetchComments = async (postId: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  ).then((data) => data.json())
  return response
}

const deletePost = async (postId: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'DELETE' }
  ).then((data) => data.json())
  return response
}

const updatePost = async (postId: number) => {
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
  const { data, isLoading, isError, error } = useQuery<
    Array<IDetailData>,
    Error
  >(['comments', post.id], () => fetchComments(post.id))

  if (isLoading) {
    return <h3>Loading...</h3>
  }

  if (isError) {
    return (
      <>
        <h3>Error</h3>
        <p>{error!.toString()}</p>
      </>
    )
  }

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button>Delete</button> <button>Updata title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data!.map((comment) => (
        <li key={comment.id}>
          {comment.email} {comment.body}
        </li>
      ))}
    </>
  )
}

export default PostDetail
