import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const register = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/sign-up/`, formData)
    return response
  } catch (error) {
    console.log('❌ Error:', error.response?.data)
    throw error
  }
}

export const login = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/sign-in/`, formData)
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}