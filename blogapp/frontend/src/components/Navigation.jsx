import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const navigation = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5,
    paddingLeft: 5,
    color: 'white',
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              Home
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              Users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <em>{user.name} logged in</em>
            <Button
              type="submit"
              onClick={handleLogout}
              id="logout"
              style={{ marginLeft: '10px' }}
              variant="secondary"
            >
              Logout
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default navigation
