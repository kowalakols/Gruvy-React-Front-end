import { useEffect, useState, useCallback } from "react"
import { useNavigate } from 'react-router-dom'

export default function useFetch(serviceFunction, initialDataValue, arg){
  // * State
  const [data, setData] = useState(initialDataValue)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

    const fetchData = useCallback(async()=> {
        setIsLoading(true);
        setError('');  
          try {
            const { data } = await serviceFunction(arg);
            setData(data);
          } catch (error){
            if (error.response && error.response.status === 401) {
              // 👇 Redirect to sign-in if unauthorized
              navigate('/login')
            } else {
              setError(error)
            }
          } finally {
            setIsLoading(false)
          }
        }, [serviceFunction, arg, navigate])
  useEffect(() => {
    fetchData();
  }, [fetchData]);
    


  return { data, isLoading, error, refetch: fetchData }
}