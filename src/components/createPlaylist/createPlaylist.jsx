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
        const formattedFormData = { ...formData, tags: formData.tags.map(tag => tag.value) }
        setIsLoading(true)
        try {
            const { data } = await createPlaylist(formattedFormData)
            navigate(`/playlist/${playlist._id}`)
        } catch (error) {
            setError(error.response.data)
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
                            name="plalist"
                            id="playlist"
                            placeholder="playlist"
                            onChange={handleInputChange}
                            value={formData.title}
                            required
                        />
                        {error.title && <p className="error-message">{error.title}</p>}
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