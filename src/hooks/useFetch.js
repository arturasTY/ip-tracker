import { useEffect, useState } from 'react'

const useFetch = (initialUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl || "")

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal
    const fetchData = async () => {
        try {
          setLoading(true)
          const response = await fetch(url, {signal});
          const data = await response.json()
          setData(data)
        } catch (error) {
          const err = error.response ? error.response.data : "Server Error"
          setError(err)
        }
        setLoading(false)
    }
    fetchData()
    return () => {
      controller.abort()
    }
  }, [url])

  return {data, loading, error, setUrl}
}

export default useFetch;
