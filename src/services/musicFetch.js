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
      console.log(error)
      throw error
    }
}

export const getSingleMusic = async (musicId) => {
  try {
    const response = await axios.get(`${BASE_URL}/music/${musicId}`)
    return response
  }
  catch (error) {
    console.log(error)
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
    console.log(error)
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
    console.log(error)
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
    console.log(error)
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
    console.log(error)
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
    console.error("Failed to fetch playlists:", error);
    throw error;
  }
}

export async function addSongToPlaylist(playlistId, songId) {
  try {
    const token = getToken();

    // Step 1: Fetch playlist
    const playlistRes = await axios.get(`${BASE_URL}/playlist/${playlistId}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // ✅ Step 2: Force extraction of IDs only
    const existingSongs = playlistRes.data.songs.map(song => {
      // If already a number, return as is
      if (typeof song === 'number') return song;
      // If an object, return its `id`
      if (typeof song === 'object' && song !== null && song.id) return song.id;
      return null; // fallback to skip bad entries
    }).filter(id => id !== null); // remove any nulls

    // ✅ Step 3: Add new song, avoid duplicates
    const updatedSongs = Array.from(new Set([...existingSongs, songId]));

    // ✅ Step 4: Send PATCH with list of IDs only
    const response = await axios.patch(
      `${BASE_URL}/playlist/${playlistId}/`,
      { songs: updatedSongs },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log("Sending songs list:", updatedSongs);

    return response.data;

  } catch (error) {
    console.error("Failed to add song:", error.response?.data || error.message);
    throw error;
  }
}
