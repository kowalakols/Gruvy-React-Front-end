import { Link, useNavigate, Navigate } from "react-router";
import { useState, useContext } from "react";
import { register } from "../../services/auth";
import { UserContext } from "../../contexts/UserContext";
import './register.css'

export default function Register(){
    const { user } = useContext(UserContext)

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})

    const navigate = useNavigate()

    const handleChange = ({ target: { name, value } }) => {
        setFormData({
          ...formData, 
          [name]: value
        })
        setError({ ...error, [name]: '' })
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault()
        setIsLoading(true)
        try {
          await register(formData)
          navigate('/login')
        }
        catch (error) {
          setError(error.response.data)
        }
        finally {
          setIsLoading(false)
        }
    }
    if (user) {
        return <Navigate to="/" />
    }
    
    return (
      <section className="signup-form-page">
        <form onSubmit={handleSubmit} className="form">
          <h1>Create an account</h1>
  
          {/* Email */}
          <div className="input-control">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Email" required onChange={handleChange} value={formData.email}/>
            { error.email && <p className="error-message">{error.email}</p>}
          </div>
  
          {/* Username */}
          <div className="input-control">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" placeholder="Username" required onChange={handleChange} value={formData.username} />
            { error.username && <p className="error-message">{error.username}</p>}
          </div>
  
          {/* Password */}
          <div className="input-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Password" required onChange={handleChange} value={formData.password} />
            { error.password && <p className="error-message">{error.password}</p>}
          </div>
  
          {/* Password Confirmation */}
          <div className="input-control">
            <label htmlFor="password_Confirmation">Password Confirmation</label>
            <input type="password" name="password_confirmation" id="password_confirmation" placeholder="Password Confirmation" required onChange={handleChange} value={formData.password_confirmation} />
            { error.password_confirmation && <p className="error-message">{error.password_confirmation}</p>}
          </div>
  
          <button type="submit" className="signup-submit-button">
            { isLoading ? <h1>is loading</h1> : 'Register' }
          </button>
  
          <small>Already have an account? <Link to="/login">Log back in</Link></small>
        </form>
      </section>
    )
}