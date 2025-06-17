import { Link, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Sidebar from "../nav/sidebar"
import { getAllPlaylist } from '../../services/musicFetch'

export default function Playlist() {
  const { data: playlists, isLoading, error } = useFetch(getAllPlaylist, [])

  return (
    <section className="home-body">
      <Sidebar />
      <section className="home-page-space">
        <h1>playlists</h1>
        <Link to={`/playlist/create`}>➕</Link>
        <section className="play-list">
          {error ? (
            <p className="error-message">{error}</p>
          ) : isLoading ? (
            <p>Loading...</p>
          ) : playlists.length > 0 ? (
            playlists.map((playlist) => (
              <article key={playlist.id} className="single-playlist">
                <Link to={`/playlist/${playlist.id}`}>
                  <h2>{playlist.playlist_name}</h2>
                </Link>
              </article>
            ))
          ) : (
            <p>No activities found</p>
          )}
        </section>
      </section>
    </section>
  )
}