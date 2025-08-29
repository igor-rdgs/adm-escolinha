import {useState, useEffect} from 'react'
import api from '../../service/index.js'



function useAlunos() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()
    const [error, setError] = useState(false)

    const getAlunos = async () => {
        setLoading(true)
        try {
        const response = await api.get("/pokemon")    
        setData(response.data)
        setLoading(false)
        }catch {
            setError(true)
            setLoading(false)
        }
    }


    useEffect(() => {
        console.log(data, 'data')
    }, [data])

    useEffect(() => {
        getAlunos()
    }, [])

    return {
        loading,
        data, 
        error,
        reload: getAlunos
    }


}

export default useAlunos

