import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { commentBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog } from '../reducers/blogReducer'
import { useState } from 'react'
import { Card, Button, Form, ListGroup, Container } from 'react-bootstrap'

const BlogView = ({ loggedInUser }) => {
  const blogs = useSelector((state) => state.blog)
  const id = useParams().id
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blog = blogs.find((n) => n.id === id)
  const [text, setComment] = useState('')

  if (!blog) {
    return null
  }
  const removeBlog = async () => {
    if (window.confirm('Do you really want delete this blog?')) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }
  const showDel = () => {
    if (loggedInUser.name === blog.user.name) {
      const response = (
        <Button
          variant="danger"
          type="submit"
          onClick={removeBlog}
          id="removeBlog"
        >
          Delete
        </Button>
      )
      return response
    }
    return null
  }
  const addLike = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
      id: blog.id,
    }
    dispatch(setNotification(`Voted for: ${blog.title}`, 10, 'notification'))
    handleLikeBlog(blogObject)
  }
  const handleLikeBlog = async (blogObject) => {
    dispatch(likeBlog(blogObject.id))
  }

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  const handleSubmit = () => {
    console.log(blog.id, text)
    dispatch(commentBlog(blog.id, text))
    setComment('')
  }
  return (
    <Container className="mt-4">
      <div>
        <div className="blogStyle">
          <div>
            <p>Title - {blog.title}</p>
            <p>Author - {blog.author}</p>
            <p>URL - {blog.url}</p>
            <p>
              {' '}
              Likes:
              <span id="countLikes"> {blog.likes} </span>
              <Button
                variant="success"
                type="submit"
                onClick={addLike}
                id="likeBlog"
              >
                Like
              </Button>
            </p>
            <p> Username - {blog.user.name}</p>
            <div>{showDel()}</div>
            <div>
              <input
                type="text"
                value={text}
                onChange={handleChange}
                placeholder="Type something..."
              />
              <button onClick={handleSubmit}>Submit</button>
            </div>
            <ul>
              {blog.comments && blog.comments.length > 0 ? (
                blog.comments.map((commentObject) => (
                  <li key={commentObject.id}>{commentObject.comment}</li>
                ))
              ) : (
                <li>No comments</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  )
}
export default BlogView
