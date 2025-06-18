import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import './music.css'

import { getAllMusic } from '../../services/musicFetch'

export default function Music(){
    const { data: musics, isLoading, error } = useFetch(getAllMusic, [])
    console.log('musics:', musics)

    return (
        <>
             <h1>MUSIC</h1>
                <section className="music-list">
                  {error
                    ? <p className='error-message'>{error}</p>
                    : isLoading
                        ? <p>Loading...</p>
                        : musics.length > 0
                        ? musics.map(music => (
                            <Link key={music.id} to={`/music/${music.id}`}>
                            <article className='single-song'>
                                <div className='music-img'>
                                    <img className='song_cover_img' src={music.cover_img} alt={music.song_name}></img>
                                </div>
                                <h2>{music.song_name}</h2>
                                <h3>{music.artist}</h3>
                            </article>
                            </Link>
                        ))
                        : <p>No activities found</p>
                    }
                </section>
        </>
    )

}