import { NavLink } from "react-router"
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
 import { removeToken } from "../../utilities/auth"
import './navbar.css'

export default function Navbar(){

  const { user, setUser } = useContext(UserContext)

  const handleSignOut = () => {
    removeToken()
    setUser(null)
  }

  return (
    <header className="navbar">
      <div className='brand-logo'>
        <NavLink to="/">🚀</NavLink>
      </div>
     {user
     ?(
      <>
        <NavLink className='navlinks' onClick={handleSignOut} to='/login'>sign out</NavLink>
      </>
     )
     :(
      <>
        <nav className="authentication">
          <NavLink to="/register">create an account</NavLink>
          <NavLink to="/login">login</NavLink>
        </nav>
      </>
     )}
    </header>
  )
}