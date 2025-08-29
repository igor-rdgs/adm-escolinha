import { useState, useEffect } from 'react'
import api from '../../service/index.js'

function useAluno() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const createAluno = async (data) => {
        setLoading(true)
        try {
            const response = await api.post('/aluno', data)
            return response.data
        } catch (err) {
            console.error("Erro ao criar aluno: ", err)
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
        } catch (error) {
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
            return response.data;
        } catch (err) {
            console.error("Erro ao listar aluno:", err);
            setError(err.response?.data?.message || "Erro ao buscar aluno");
            throw err;
        } finally {
            setLoading(false);
        }
    }


    return {
        loading,
        error,
        createAluno,
        updateAluno,
        deleteAluno,
        getByAluno
    }


}

export default useAluno
