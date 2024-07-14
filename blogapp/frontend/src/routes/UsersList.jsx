import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UsersList = ({ users }) => {
  return (
    <Container className="mt-4">
      <div className="blogStyle">
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th className="center-text">Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td className="center-text">{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  )
}

export default UsersList
