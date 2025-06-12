import { NavLink } from "react-router"
import './sidebar.css'

export default function Sidebar(){
  return (
    <aside className="sidebar">
      <nav className="side-bar">
        <NavLink to="/" className="navlink">Home</NavLink>
        <NavLink to="/music" className="navlink">explore</NavLink>
        <NavLink to="/playlist" className="navlink">playlist</NavLink>
      </nav>
    </aside>
  )
}