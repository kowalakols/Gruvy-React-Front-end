import { Routes, Route } from 'react-router'

import Navbar from './components/nav/navbar.jsx'
import Home from './components/home/Home.jsx'
import Music from './components/Music/Music.jsx'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import ShowMusic from './components/showMusic/showMusic.jsx'
import Playlist from './components/Playlist/Playlist.jsx'
import ShowPlaylist from './components/showPlaylist/showPlaylist.jsx'
import playlistCreate from './components/createPlaylist/createPlaylist.jsx'

import { useContext } from 'react'
import { UserContext } from './contexts/UserContext'
import PlaylistCreate from './components/createPlaylist/createPlaylist.jsx'


function App() {
  const { user } = useContext(UserContext)

  return (
    <>
     <Navbar />
      <Routes>
        <Route path='/' element ={<Home />}/>
        <Route path='/music' element ={< Music />}/>
        <Route path='/music/:musicId' element ={< ShowMusic/>}/>
        <Route path='/playlist' element ={<Playlist />}/>
        <Route path='/playlist/:playlistId' element={<ShowPlaylist />}/>
        <Route path='/playlist/create' element ={<PlaylistCreate />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes> 
    </>
  )
}

export default App
