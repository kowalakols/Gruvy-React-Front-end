import { Link, useNavigate, Navigate } from "react-router"
import { useState, useContext } from 'react'
import { setToken, getUserFromToken } from "../../utilities/auth"
import { UserContext } from '../../contexts/UserContext'
import { createPlaylist } from "../../services/musicFetch"



export default function playlistCreate() {
    // Context
    const { user } = useContext(UserContext)
    // States
    const [formData, setFormData] = useState({
        playlist_name: '',
        songs: [],
    })

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // varibles
    const navigate = useNavigate()

    // Form functions
    async function handleInputChange({ target: { name, value, type, files } }) {
        if (type === 'file') {
            value = files[0]
        }
        setFormData({ ...formData, [name]: value })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        try {
            console.log(formData)
            const { data } = await createPlaylist(formData)
            navigate(`${BASE_URL}/playlist/${playlistId}`)
        } catch (error) {
             console.error(error);
            const msg = error.response?.data?.message || "Failed to create playlist.";
            setError(msg);
        } finally {
            setIsLoading(false)
        }
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    // Form
    return (
        <section className="form-page">
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-card">
                    <h1 className="form-title">create a new playlist</h1>

                    {/* Title */}
                    <div className="input-control">
                        <label htmlFor="playlist_name">playlist name: </label>
                        <input
                            type="text"
                            name="playlist_name"
                            id="playlist_name"
                            placeholder="enter playlist name"
                            onChange={handleInputChange}
                            value={formData.title}
                            required
                        />
                        {error && <p className="error-message">{error}</p>}
                    </div>
                     {/* Submit */}
                <button className="playlist-submit-button" type="submit">
                    create
                </button>
                </div>
            </form>
        </section>
    )
}