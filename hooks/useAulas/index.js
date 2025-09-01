import { useState } from "react";
import api from "../../service";

function useAulas() {
  const [loading, setLoading] = useState(false);
  const [aulas, setAulas] = useState([]);
  const [error, setError] = useState(null);

  const getAulas = async (alunoId, jornadaId) => {
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

  return {
    loading,
    aulas,
    error,
    getAulas,
    reload: getAulas
  };
}

export default useAulas;
