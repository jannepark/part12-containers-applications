import Notification from './Notification'
import PropTypes from 'prop-types'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

  return (
    <>
      <div>
        <h2>Login</h2>
        <Notification />
        <Form onSubmit={handleSubmit}>
          <FloatingLabel label="Username" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
              id="username"
            />
            <Form.Text className="text-muted">
              We will never share your information with anyone else.
            </Form.Text>
          </FloatingLabel>

          <FloatingLabel label="Password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
              id="password"
            />
          </FloatingLabel>

          <Button variant="primary" type="submit" id="login-button">
            Login
          </Button>
        </Form>
        <p>Department of Computer Science, University of Helsinki 2023</p>
      </div>
    </>
  )
}
export default LoginForm
