import { useState, useEffect } from 'react';
import api from "@/service";

export default function useJornadas(alunoId) {
    const [loading, setLoading] = useState(false)
    const [jornadas, setJornadas] = useState()
    const [error, setError] = useState(null)

    const getJornadas = async () => {
        if(!alunoId) return
        setLoading(true)
        try {
            const response = await api.get(`/aluno/${alunoId}/jornada`)
            setJornadas(response.data) 
            setError(null)
        } catch (err) {
            console.log('Erro ao listar jornadas:', err)
            setError(err.response?.data?.message || "Erro ao buscar jornadas")
            return(error)
        } finally {
            setLoading(false)
        }

    }
    
    useEffect(() => {
        getJornadas();
    }, [alunoId])

    useEffect(() => {
        console.log(jornadas, 'jornadas');
        
    }, [jornadas])

    return {
        loading,
        jornadas,
        error,
        getJornadas,
        reload: getJornadas
    }
}