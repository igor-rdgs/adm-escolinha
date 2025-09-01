import { useEffect, useState } from "react";
import api from "../../service";

function useAulas(alunoId, jornadaId) {
  const [loading, setLoading] = useState(false);
  const [aulas, setAulas] = useState([]);
  const [error, setError] = useState(null);

  const getAulas = async () => {
    if (!alunoId && !jornadaId) return
    setLoading(true);
    try {
      const response = await api.get(`/aluno/${alunoId}/jornada/${jornadaId}/aula`);
      setAulas(response.data);
    } catch (err) {
      console.error("Erro ao carregar aulas:", err);
      setError(err.response?.data?.message || "Erro ao carregar aulas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAulas();
  }, [alunoId, jornadaId])

  return {
    loading,
    aulas,
    error,
    getAulas,
    reload: getAulas
  };
}

export default useAulas;
