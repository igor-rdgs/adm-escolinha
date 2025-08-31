import { useState, useEffect } from 'react'
import api from '../../service/index.js'

function useAlunos() {
    const [loading, setLoading] = useState(false)
    const [alunos, setAlunos] = useState()
    const [error, setError] = useState(false)

    const getAlunos = async () => {
        setLoading(true)
        try {
            const response = await api.get("/aluno")
            setAlunos(response.data)
            setLoading(false)
            setError(false)
        } catch {
            setError(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        console.log(alunos, 'alunos')
    }, [alunos])

    useEffect(() => {
        getAlunos()
    }, [])

    return {
        loading,
        alunos,
        error,
        getAlunos,
        reload: getAlunos
    }
}

export default useAlunos

