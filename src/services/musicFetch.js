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
    const response = await axios.get(`${BASE_URL}/playlist`)
    return response
  }
  catch(error){
    console.log(error)
    throw error
  }
}
export const getSinglePlaylist = async(playlistId) => {
  try {
    const response = await axios.get(`${BASE_URL}/playlist/${playlistId}`)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}


export const createPlaylist = async (formData) => {
  try {
    return axios.post(`${BASE_URL}/playlist/`, formData, {
      headers:{
        Authorization: `Bearer ${getToken()}`
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
    return axios.put(`${BASE_URL}/playlist/${musicId}`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deletePlaylist = async (playlistId) => {
  try {
    console.log('hit delete route')
    return axios.delete(`${BASE_URL}/playlist/${playlistId}/`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserPlaylists() {
  try {
    const response = await axios.get(`${BASE_URL}/playlist/`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
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
    const response = await axios.put(
      `${BASE_URL}/playlist/${playlistId}/`,
      { song_id: songId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
    return response.data;
    console.log(response.data)
  } catch (error) {
    console.error("Failed to add song:", error);
    throw error;
  }
}