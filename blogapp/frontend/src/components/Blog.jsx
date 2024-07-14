import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  return (
    <>
      <div className="blogStyle">
        <p>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>- {blog.author}
        </p>
      </div>
    </>
  )
}

export default Blog
