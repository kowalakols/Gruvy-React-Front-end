import axios from "axios";
import { getToken } from '../utilities/auth'
import { data } from "react-router";

console.log(import.meta.env.VITE_API_BASE_URL)
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getAllMusic = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/music`)
      return response
    }
    catch (error) {
      console.log(error.response?.data || error.message)
      throw error
    }
}

export const getSingleMusic = async (musicId) => {
  try {
    const response = await axios.get(`${BASE_URL}/music/${musicId}`)
    return response
  }
  catch (error) {
    console.log(error.response?.data || error.message)
    throw error
  }
}

export const getAllPlaylist = async() => {
  try{
    const token = getToken()
    const response = await axios.get(`${BASE_URL}/playlist/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  }
  catch(error){
    console.log(error)
    throw error
  }
}
export const getSinglePlaylist = async(playlistId) => {
  try {
    const token = getToken()
    const response = await axios.get(`${BASE_URL}/playlist/${playlistId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.log(error.response?.data || error.message)
    throw error
  }
}


export const createPlaylist = async (formData) => {
  try {
    const token = getToken()
    return axios.post(`${BASE_URL}/playlist/`, formData, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    // .then(res => console.log(res))
    // .catch(err => console.log(err));
  } 
  catch (error) {
    console.log(error.response?.data || error.message)
    throw error
  }
}

export const updatePlaylist = async (musicId, formData) => {
  try {
    const token = getToken()
    return axios.put(`${BASE_URL}/playlist/${musicId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.log(error.response?.data || error.message)
    throw error
  }
}

export const deletePlaylist = async (playlistId) => {
  try {
    const token = getToken()
    console.log('hit delete route')
    return axios.delete(`${BASE_URL}/playlist/${playlistId}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.log(error.response?.data || error.message)
    throw error
  }
}

export async function getUserPlaylists() {
  try {
    const token = getToken()
    const response = await axios.get(`${BASE_URL}/playlist/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch playlists:", error.response?.data || error.message);
    throw error;
  }
}

export async function addSongToPlaylist(playlistId, songId) {
  try {
    const token = getToken();

    const response = await axios.patch(
      `${BASE_URL}/playlist/${playlistId}/`,
      { song_id: songId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Failed to add song:", error.response?.data || error.message);
    throw error;
  }
}

export const searchSongs = async (query) => {
  const response = await axios.get(`${BASE_URL}/music/?search=${query}`)
  return response.data
}

export async function removeSong(playlistId, songId) {
  try {
    const token = getToken()

    // Fetch the current playlist
    const res = await axios.get(`${BASE_URL}/playlist/${playlistId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const playlist = res.data

    // Send updated data to backend
    const response = await axios.put(
      `${BASE_URL}/playlist/${playlistId}/`,
      {
        playlist_name: playlist.playlist_name,
        remove_song_id: songId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error) {
    console.error("❌ Failed to remove song:", error.response?.data || error.message)
    throw error
  }
}