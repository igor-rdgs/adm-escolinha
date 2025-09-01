"use client";

import { useState } from "react";
import { Button, Input, Fieldset, Field } from "@chakra-ui/react";
import { useAula } from "../../hooks";

export default function CreateAulaForm({ alunoId, jornadaId, onCreated }) {
  const { createAula, loading } = useAula();
  const [form, setForm] = useState({
    modulo: "",
    numero: "",
    data: "",
    instrutor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAula(alunoId, jornadaId, form);
    setForm({ modulo: "", numero: "", data: "", instrutor: "" });
    onCreated?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Legend>Nova Aula</Fieldset.Legend>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Módulo</Field.Label>
            <Input name="modulo" value={form.modulo} onChange={handleChange} />
            <Field.Label>Número</Field.Label>
            <Input name="numero" value={form.numero} onChange={handleChange} />
            <Field.Label>Data</Field.Label>
            <Input name="data" type="date" value={form.data} onChange={handleChange} />
            <Field.Label>Instrutor</Field.Label>
            <Input name="instrutor" value={form.instrutor} onChange={handleChange} />
          </Field.Root>
        </Fieldset.Content>
        <Button type="submit" colorScheme="blue" isLoading={loading}>
          Salvar
        </Button>
      </Fieldset.Root>
    </form>
  );
}
