import { Link, useParams } from 'react-router-dom'
import { getSingleMusic, getSinglePlaylist } from '../../services/musicFetch'
import useFetch from '../../hooks/useFetch'
import { UserContext } from '../../contexts/UserContext'
import { useContext, useState } from 'react'
import Playlist from '../Playlist/Playlist'
import Sidebar from "../nav/sidebar"
import './showplaylist.css'
import { deletePlaylist } from '../../services/musicFetch'
import { removeSong } from '../../services/musicFetch'
import { useNavigate } from 'react-router-dom';


export default function ShowPlaylist() {
    const { playlistId } = useParams();
    console.log(playlistId);
    const { user } =useContext(UserContext);
    // const response = music;
    const {data: playlist, isLoading, error, refetch } = useFetch(
        getSinglePlaylist, 
        {},
        playlistId
    );
    const navigate = useNavigate();
    async function handleDelete() {
        try {
            await deletePlaylist(playlistId)
            navigate('/playlist')
        } catch (error) {
            console.log(error)
        }
    }
    const handleRemove = async (songId) => {
        try {
            await removeSong(playlistId, songId)
            await refetch() // ✅ this comes from useFetch
        } catch (err) {
            console.error("❌ Failed to remove song:", err)
        }
    }

    return (
        <>
            <section className="playlist">
                {error
                ? <p className='error-message'>{error}</p>
                : isLoading
                    ? <p>Loading...</p>
                    : playlist
                    ? 
                    <section className="home-body">
                        <Sidebar />
                        <section className="home-page-space">
                            <section className="single-playlist">
                            <section className='singleplaylist'>
                                <section className='song-top'>
                                    <h1>{playlist.playlist_name}</h1>
                                    {user && (
                                        <button onClick={() => handleDelete(playlist.id)}>🗑️</button>
                                    )}
                                    
                                </section>
                                <section className='song-detail'>
                                    {console.log("Playlist songs:", playlist.songs)}
                                    {Array.isArray(playlist.songs) && playlist.songs.map(song => (
                                        
                                        <article key={song.id} className='playlist-single-song'>
                                          <Link key={song.id} to={`/music/${song.id}`}>
                                            <div className='music-img'>
                                                <img className='song_cover_img' src={song.cover_img} alt={song.song_name}></img>
                                            </div>
                                            <h2>{song.song_name}</h2>
                                            <h3>{song.artist}</h3>
                                          </Link>   
                                            <button 
                                                onClick={() => handleRemove(song.id)} 
                                                className='remove-btn'
                                            >
                                                ➖
                                            </button>
                                        </article>
                                        
                                    ))}
                                </section>
                            </section>
                        </section>
                    </section>
                    </section>
                    : <p>No activities found</p>
                    }
                </section>
        </>
    )
}