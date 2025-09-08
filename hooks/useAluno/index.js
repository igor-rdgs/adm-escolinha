import { useState, useEffect } from 'react'
import api from '../../service/index.js'

function useAluno(alunoId = undefined) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState()

    const createAluno = async (data) => {
        setLoading(true)
        try {
            const response = await api.post('/aluno', data)
            return response.data
        } catch (err) {
            console.error("Erro ao criar aluno: ", err)
            console.log('erro')
            setError(err.response?.data?.message || "Erro ao criar aluno")
            throw err
        } finally {
            setLoading(false)
        }
    }


    const updateAluno = async (id, data) => {
        setLoading(true)
        try {
            const response = await api.put(`/aluno/${id}`, data)
            return response.data
        } catch (err) {
            console.error("Erro ao atualizar aluno:", err);
            setError(err.response?.data?.message || "Erro ao atualizar aluno");
            throw err;
        } finally {
            setLoading(false)
        }
    }

    const deleteAluno = async (id) => {
        setLoading(true);

        try {
            const response = await api.delete(`/aluno/${id}`);
            return response.data;
        } catch (err) {
            console.error("Erro ao deletar aluno:", err);
            setError(err.response?.data?.message || "Erro ao deletar aluno");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const getByAluno = async (id) => {
        setLoading(true);

        try {
            const response = await api.get(`/aluno/${id}`);
            setData(response.data)
            return 
        } catch (err) {
            console.error("Erro ao listar aluno:", err);
            setError(err.response?.data?.message || "Erro ao buscar aluno");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
if(alunoId) {
    getByAluno(alunoId)
}
    }, [alunoId])

    return {
        loading,
        error,
        createAluno,
        updateAluno,
        deleteAluno,
        getByAluno, data
    }


}

export default useAluno
