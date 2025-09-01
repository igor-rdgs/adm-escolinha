"use client";

import { useState, useEffect } from "react";
import { Button, Input, Fieldset, Field } from "@chakra-ui/react";
import { useAula, useAulas } from "../../../../../hooks";

export default function EditarAulaForm({ alunoId, jornadaId, aula, onCancel }) {
  const { updateAula, loading, error } = useAula();
  const { reload } = useAulas(alunoId, jornadaId);

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    data: "",
  });

  useEffect(() => {
    if (aula) {
      setForm({
        titulo: aula.titulo || "",
        descricao: aula.descricao || "",
        data: aula.data || "",
      });
    }
  }, [aula]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.titulo.trim()) {
      alert("Título é obrigatório!");
      return;
    }

    try {
      await updateAula(alunoId, jornadaId, aula.id, {
        titulo: form.titulo,
        descricao: form.descricao || null,
        data: form.data || null,
      });

      alert("Aula atualizada com sucesso!");
      reload();
      onCancel(); // volta para o estado de "criação"
    } catch {
      alert("Erro ao atualizar aula");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Legend>Editar Aula</Fieldset.Legend>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Título</Field.Label>
            <Input
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
            />

            <Field.Label>Descrição</Field.Label>
            <Input
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
            />

            <Field.Label>Data</Field.Label>
            <Input
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
            />
          </Field.Root>
        </Fieldset.Content>

        <Button
          type="submit"
          alignSelf="flex-start"
          colorScheme="green"
          isLoading={loading}
        >
          Atualizar
        </Button>
        <Button
          type="button"
          alignSelf="flex-start"
          colorScheme="gray"
          ml={2}
          onClick={onCancel}
        >
          Cancelar
        </Button>
      </Fieldset.Root>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
