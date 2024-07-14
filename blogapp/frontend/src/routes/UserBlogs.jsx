import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const UserBlogs = ({ users }) => {
  const id = useParams().id

  const user = users.find((n) => n.id === id)
  if (!user) {
    return null
  }

  return (
    <Container className="mt-4">
      <div className="blogStyle">
        <h2>{user.name}</h2>
        <h4>Added blogs:</h4>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </Container>
  )
}
export default UserBlogs
