import { NavLink, Link } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../contexts/UserContext"
import { removeToken } from "../../utilities/auth"
import { searchSongs } from "../../services/musicFetch"  // <-- you’ll define this
import './navbar.css'

export default function Navbar(){

  const { user, setUser } = useContext(UserContext)
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState([])

  const handleSignOut = () => {
    removeToken()
    setUser(null)
  }
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchQuery.trim()) {
        searchSongs(searchQuery)
          .then(data => setResults(data))
          .catch(() => setResults([]))
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(delay)
  }, [searchQuery])

  return (
    <header className="navbar">
      <div className='brand-logo'>
        <NavLink to="/">groovy</NavLink>
      </div>

      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search songs..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {results.length > 0 && (
          <ul className="search-dropdown">
            {results.map(song => (
              <li key={song.id}>
                <Link to={`/music/${song.id}`} onClick={() => setSearchQuery("")}>
                  {song.song_name}
                </Link>
              </li>
            ))}
          </ul>
        )}
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