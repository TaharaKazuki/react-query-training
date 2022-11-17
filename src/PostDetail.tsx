import type { Post } from './Posts'
import { FC, useEffect } from 'react'
import { useQuery, useMutation } from 'react-query'

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
  console.info(postId)
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'DELETE',
  }).then((res) => res.json())
  return response
}

const updatePost = async (postId: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'PATCH',
    body: JSON.stringify({ title: 'React Query Patch' }),
  }).then((res) => res.json())
  return response
}

export const PostDetail: FC<Props> = ({ post }) => {
  useEffect(() => {
    deleteMutation.reset()
    updateMutation.reset()
  }, [post.id])

  const { data, isLoading, isError, error } = useQuery<Comment[], Error>(
    ['comments', post.id],
    () => fetchComments(post.id)
  )

  const deleteMutation = useMutation((postId: number) => deletePost(postId))
  const updateMutation = useMutation((postId: number) => updatePost(postId))

  if (isLoading) {
    return <h3>Loading</h3>
  }

  if (isError) {
    return (
      <>
        <h3>Error</h3>
        <p>{error.toString()}</p>
      </>
    )
  }

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
      {deleteMutation.isError && <p style={{ color: 'red' }}>Error deleting the post</p>}
      {deleteMutation.isLoading && <p style={{ color: 'purple' }}>Deleting the post</p>}
      {deleteMutation.isSuccess && <p style={{ color: 'green' }}>Post has deleted</p>}
      {updateMutation.isError && <p style={{ color: 'red' }}>Error updating the post</p>}
      {updateMutation.isLoading && <p style={{ color: 'purple' }}>Updating the post</p>}
      {updateMutation.isSuccess && <p style={{ color: 'green' }}>Post has updated</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data?.map((comment) => (
        <li key={comment.id}>
          {comment.email}:{comment.body}
        </li>
      ))}
    </>
  )
}
