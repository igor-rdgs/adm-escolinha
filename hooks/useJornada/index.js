import { useState } from 'react';
import api from '@/service';

function useJornada(alunoId) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createJornada = async (data) => {
        setLoading(true);
        try {
            const response = await api.post(`/aluno/${alunoId}/jornada`, data);
            return response.data;
        } catch (err) {
            console.error("Erro ao criar jornada:", err);
            setError(err.response?.data?.message || "Erro ao criar jornada");
            throw err;
        }
    }

    const updateJornada = async (jornadaId, data) => {
    setLoading(true);
    try {
      const response = await api.put(`/aluno/${alunoId}/jornada/${jornadaId}`, data);
      return response.data;
    } catch (err) {
      console.error("Erro ao atualizar jornada:", err);
      setError(err.response?.data?.message || "Erro ao atualizar jornada");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteJornada = async (jornadaId) => {
    setLoading(true);
    try {
      const response = await api.delete(`/aluno/${alunoId}/jornada/${jornadaId}`);
      return response.data;
    } catch (err) {
      console.error("Erro ao deletar jornada:", err);
      setError(err.response?.data?.message || "Erro ao deletar jornada");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getByJornada = async (jornadaId) => {
    setLoading(true);
    try {
      const response = await api.get(`/aluno/${alunoId}/jornada/${jornadaId}`);
      return response.data;
    } catch (err) {
      console.error("Erro ao buscar jornada:", err);
      setError(err.response?.data?.message || "Erro ao buscar jornada");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createJornada,
    updateJornada,
    deleteJornada,
    getByJornada,
  };
}

export default useJornada;