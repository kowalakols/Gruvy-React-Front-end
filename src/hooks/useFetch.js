import { useEffect, useState } from "react"
export default function useFetch(serviceFunction, initialDataValue, arg){
  // * State
  const [data, setData] = useState(initialDataValue)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // * Effects (on mount)
  useEffect(() => {
    async function fetchData(){
      try {
        const { data } = await serviceFunction(arg)
        setData(data)
      } catch {
        setError('Failed to fetch data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [serviceFunction, arg])


  return { data, isLoading, error }
}