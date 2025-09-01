import { useState } from "react";
import api from "../../service";

function useAula() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createAula = async (alunoId, jornadaId, data) => {
    setLoading(true);
    try {
      const response = await api.post(`/aluno/${alunoId}/jornada/${jornadaId}/aula`, data);
      return response.data;
    } catch (err) {
      console.error("Erro ao criar aula:", err);
      setError(err.response?.data?.message || "Erro ao criar aula");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAula = async (alunoId, jornadaId, aulaId, data) => {
    setLoading(true);
    try {
      const response = await api.put(`/aluno/${alunoId}/jornada/${jornadaId}/aula/${aulaId}`, data);
      return response.data;
    } catch (err) {
      console.error("Erro ao atualizar aula:", err);
      setError(err.response?.data?.message || "Erro ao atualizar aula");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAula = async (alunoId, jornadaId, aulaId) => {
    setLoading(true);
    try {
      const response = await api.delete(`/aluno/${alunoId}/jornada/${jornadaId}/aula/${aulaId}`);
      return response.data;
    } catch (err) {
      console.error("Erro ao deletar aula:", err);
      setError(err.response?.data?.message || "Erro ao deletar aula");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createAula,
    updateAula,
    deleteAula
  };
}

export default useAula;
