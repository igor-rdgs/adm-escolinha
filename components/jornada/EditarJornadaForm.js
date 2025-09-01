"use client";
import { useState, useEffect } from "react";
import { Button, Input, Fieldset, Field, Flex } from "@chakra-ui/react";
import { useJornada } from "../../hooks";

export default function EditarJornadaForm({ alunoId, jornada, onUpdated, onCancel }) {
  const { updateJornada, loading, error } = useJornada(alunoId);
  const [form, setForm] = useState({
    instrumento: "",
    status: "",
    data_inicio: "",
  });

  useEffect(() => {
    if (jornada) {
      setForm({
        instrumento: jornada.instrumento || "",
        status: jornada.status || "",
        data_inicio: jornada.data_inicio || "",
      });
    }
  }, [jornada]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (!form.data_inicio || !form.instrumento.trim() || !form.status.trim()) {
      e.preventDefault()
      alert("Campos não informados")
      return
    } else {
      try {
        await updateJornada(jornada.id, form);
        alert("Jornada atualizada com sucesso!");
        onUpdated && onUpdated();
      } catch {
        alert("Erro ao atualizar jornada");
      }
    };
    }

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Legend>Editar Jornada</Fieldset.Legend>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Instrumento</Field.Label>
            <Input
              name="instrumento"
              value={form.instrumento}
              onChange={handleChange}
            />
            <Field.Label>Status</Field.Label>
            <Input name="status" value={form.status} onChange={handleChange} />
            <Field.Label>Data de Início</Field.Label>
            <Input
              type="date"
              name="data_inicio"
              value={form.data_inicio}
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
