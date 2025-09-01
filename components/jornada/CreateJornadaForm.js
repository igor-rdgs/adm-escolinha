"use client";
import { useState } from "react";
import { Button, Input, Fieldset, Field } from "@chakra-ui/react";
import { useJornada } from "../../hooks";

export default function CreateJornadaForm({ alunoId, reload }) {
  const { createJornada, loading, error } = useJornada(alunoId);
  const [form, setForm] = useState({
    instrumento: "",
    status: "",
    data_inicio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.data_inicio || !form.instrumento.trim() || !form.status.trim()) {
      alert("Campos não informados")
      return
    }
    try {
      await createJornada(form);
      alert("Jornada criada com sucesso!");
      setForm({ instrumento: "", status: "", data_inicio: "" });
      reload(); // recarrega tabela no pai
    } catch {
      alert("Erro ao criar jornada");
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Legend>Nova Jornada</Fieldset.Legend>
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
        <Button type="submit" colorScheme="blue" isLoading={loading}>
          Salvar
        </Button>
      </Fieldset.Root>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
