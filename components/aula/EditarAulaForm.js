"use client";

import { useState, useEffect } from "react";
import { Button, Input, Fieldset, Field, Flex } from "@chakra-ui/react";
import { useAula, useAulas } from "../../hooks";

export default function EditarAulaForm({ alunoId, jornadaId, aula, onCancel }) {
  const { updateAula, loading, error } = useAula();
  const { reload } = useAulas(alunoId, jornadaId);

  const [form, setForm] = useState({
    modulo: "",
    numero: "",
    data: "",
    instrutor: "",
  });

  useEffect(() => {
    if (aula) {
      setForm({
        modulo: aula.modulo,
        numero: aula.numero,
        data: aula.data,
        instrutor: aula.instrutor,
      });
    }
  }, [aula]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (!form.modulo.trim() || !form.numero.trim() || !form.data.trim() || !form.instrutor.trim()) {
      e.preventDefault();
      alert("Campos obrigatórios!");
      return;
    } else {
      try {
        await updateAula(alunoId, jornadaId, aula.id, form);
        alert("Aula atualizada com sucesso!");
        reload();
        onCancel(); // volta para o estado de "criação"
      } catch {
        alert("Erro ao atualizar aula");
      }
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Legend>Editar Aula</Fieldset.Legend>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Módulo</Field.Label>
            <Input
              name="modulo"
              value={form.modulo}
              onChange={handleChange}
            />

            <Field.Label>Número</Field.Label>
            <Input
              name="numero"
              value={form.numero}
              onChange={handleChange}
            />

            <Field.Label>Data</Field.Label>
            <Input
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
            />
            
            <Field.Label>Instrutor</Field.Label>
            <Input
              name="instrutor"
              value={form.instrutor}
              onChange={handleChange}
            />
          </Field.Root>
        </Fieldset.Content>

        <Flex gap={2}>
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
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </Flex>
      </Fieldset.Root>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
