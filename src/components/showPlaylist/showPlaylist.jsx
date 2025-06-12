import { Link, useParams } from 'react-router-dom'
import { getSingleMusic, getSinglePlaylist } from '../../services/musicFetch'
import useFetch from '../../hooks/useFetch'
import { UserContext } from '../../contexts/UserContext'
import { useContext, useState } from 'react'
import Playlist from '../Playlist/Playlist'
import Sidebar from "../nav/sidebar"
import './showplaylist.css'
import { deletePlaylist } from '../../services/musicFetch'


export default function ShowPlaylist() {
    const { playlistId } = useParams();
    console.log(playlistId);
    const { user } =useContext(UserContext);
    // const response = music;
    const {data: playlist, isLoading, error } = useFetch(
        getSinglePlaylist, 
        {},
        playlistId
    );
    async function handleDelete() {
        try {
            await deletePlaylist(playlistId)
            navigate('/playlist')
        } catch (error) {
            console.log(error)
        }
    }
    

    return (
        <>
            <section className="music-list">
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
                                    {playlist.songs.map(song => (
                                        <Link key={song.id} to={`/music/${song.id}`}>
                                        <article className='playlist-single-song'>
                                            <div className='music-img'>
                                                <img className='song_cover_img' src={song.cover_img} alt={song.song_name}></img>
                                            </div>
                                            <h2>{song.song_name}</h2>
                                        </article>
                                        </Link>
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