import { Link, useParams } from 'react-router-dom'
import { getSingleMusic ,getUserPlaylists , addSongToPlaylist} from '../../services/musicFetch'
import useFetch from '../../hooks/useFetch'
import { UserContext } from '../../contexts/UserContext'
import { useContext, useState, useEffect } from 'react'
import Music from '../Music/Music'
import './showMusic.css'
import Sidebar from "../nav/sidebar"

export default function ShowMusic() {
    const { musicId } = useParams();
    console.log(musicId);
    const { user } =useContext(UserContext);
    // const response = music;
    const {data: music, isLoading, error } = useFetch(
        getSingleMusic, 
        {},
        musicId
    );
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        async function fetchPlaylists() {
            if (!user) return;
            try {
                const result = await getUserPlaylists();  // You must define this function
                setPlaylists(result);
            } catch (err) {
                console.error("Error fetching playlists:", err);
            }
        }
        fetchPlaylists();
    }, [user]);
    
    async function handleAddToPlaylist() {
        try {
            await addSongToPlaylist(selectedPlaylist, musicId);
            setSuccessMsg("Song added to playlist!");
        } catch (err) {
            console.error("Failed to add song:", err);
            setSuccessMsg("Failed to add song.");
        }
    } 

    const AudioPlayer = ({ src }) => {
        return (
            <div className="p-4 bg-gray-100 rounded-xl shadow-md max-w-md mx-auto">
                <audio controls className="w-full rounded-md">
                    <source src={src} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            </div>
            );
        };
    

    return (
        <>
            <section className="music-list">
                {error
                ? <p className='error-message'>{error}</p>
                : isLoading
                    ? <p>Loading...</p>
                    : music
                    ? 
                    <section className="home-body">
                        <Sidebar />
                        <section className="home-page-space">
                            <section className="single-song">
                            <section className='singleMusic'>
                                <section className='song-top'>
                                    <img className="singleMusicImage" src={music.cover_img} alt='movie image' />
                                    <div className='singleMusicDetail'>
                                        <h1 id='musicName'>{music.song_name}</h1>
                                        <h3>Artist: {music.artist}</h3>
                                         {user && (
                                                <div className="add-to-playlist">
                                                    <select value={selectedPlaylist} onChange={e => setSelectedPlaylist(e.target.value)}>
                                                        <option value="">--Select Playlist--</option>
                                                        {playlists.map(p => (
                                                            <option key={p.id} value={p.id}>{p.playlist_name}</option>
                                                        ))}
                                                    </select>
                                                    <button onClick={handleAddToPlaylist} disabled={!selectedPlaylist}>➕ Add</button>
                                                    {successMsg && <p>{successMsg}</p>}
                                                </div>
                                         )}
                                        <div className='linkToSong'>
                                            <a href={music.song_url} target="_blank">Play On MUX</a>
                                        </div>
                                        </div>
                                </section>
                                <section className='song-detail'>
                                    <h1>genre: {music.genre} </h1>
                                    <h1>producer: {music.producer}</h1>
                                    <h1>release date: {music.release_date}</h1>
                                </section>
                                <section className='lyrics'>
                                    <h1>lyrics</h1>
                                    <h3>{music.lyrics}</h3>
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