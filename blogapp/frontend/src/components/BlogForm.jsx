import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    createBlog(newBlog)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <Form onSubmit={addBlog}>
      <FloatingLabel label="Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={handleTitleChange}
          id="title-Input"
        />
      </FloatingLabel>

      <FloatingLabel label="Author" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Author"
          value={newAuthor}
          onChange={handleAuthorChange}
          id="author-Input"
        />
      </FloatingLabel>

      <FloatingLabel label="URL" className="mb-3">
        <Form.Control
          type="text"
          placeholder="URL"
          value={newUrl}
          onChange={handleUrlChange}
          id="url-Input"
        />
      </FloatingLabel>

      <Button variant="primary" type="submit" id="create-blog">
        Create
      </Button>
    </Form>
  )
}
export default BlogForm
