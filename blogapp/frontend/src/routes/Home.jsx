import { useRef } from 'react'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Home = ({ user, blogs }) => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

  return (
    <>
      <h4>Create new</h4>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <div>
        {blogs && blogs.length > 0 ? (
          <Table striped>
            <tbody>
              {[...blogs]
                .sort((i, j) => j.likes - i.likes)
                .map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </td>
                    <td>{blog.author}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        ) : (
          <div>Loading blogs...</div>
        )}
      </div>
    </>
  )
}
export default Home
