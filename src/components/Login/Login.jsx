import { Link, useNavigate, Navigate } from "react-router"
import { useState, useContext } from 'react'
import { login } from "../../services/auth"
import { setToken, getUserFromToken } from "../../utilities/auth"
import { UserContext } from '../../contexts/UserContext'
import './login.css'

export default function Login(){
  // * Context
  const { user, setUser } = useContext(UserContext)

  // * State
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // * Location variables
  const navigate = useNavigate()

  // * Functions
  const handleChange = ({ target: { name, value }}) => {
    setFormData({ ...formData, [name]: value })
    setError({ ...error, [name]: '' })
  }
  

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    setIsLoading(true)
    try {
      // Make API call
      const { data } = await login(formData)
      // Set the token from the response to storage
      setToken(data.token)
      // Set the user object inside the token to the user context state
      setUser(getUserFromToken())
      // Finally, navigate to the next page
      navigate('/music')
    } catch (error) {
      setError(error.response.data)
    } finally {
      setIsLoading(false)
    }
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <section className="signin-form-page ">
      <form onSubmit={handleSubmit} className="form">
        <h1>Welcome back!</h1>

        {/* Email */}
        <div className="input-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" required onChange={handleChange} value={formData.email} />
        </div>

        {/* Password */}
        <div className="input-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Password" required onChange={handleChange} value={formData.password} />
        </div>

        { error.message && <p className="error-message">{error.message}</p> }

        <button type="submit" className="signin-submit-button">
          { isLoading ? <p>loading...</p> : 'Log in'}
        </button>

        <small>Don't have an account? <Link to="/register">Register here</Link></small>
      </form>
    </section>
  )
}