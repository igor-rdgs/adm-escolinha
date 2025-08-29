"use client";
import { useState } from "react";
import { Button, Input, Fieldset, Field } from "@chakra-ui/react";
import { useAluno } from "../../hooks";

export default function CreateAlunoForm() {
    const { createAluno, loading, error } = useAluno();
    const [form, setForm] = useState({
        nome: "",
        idade: "",
        comum: "",
        endereco: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        if (!form.nome.trim() || !form.idade || !form.comum.trim()) {
            e.preventDefault()
            alert("Campos não informados!")
            return
        } else {
            try {
                await createAluno({
                    nome: form.nome,
                    idade: Number(form.idade),
                    comum: form.comum,
                    endereco: form.endereco || null,
                });

                alert("Aluno criado com sucesso!");
                setForm({ nome: "", idade: "", comum: "", endereco: "" });
            } catch {
                alert("Erro ao criar aluno");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Fieldset.Root size="lg" maxW="md">
                <Fieldset.Legend>Novo Aluno</Fieldset.Legend>

                <Fieldset.Content>
                    <Field.Root>
                        <Field.Label>Nome</Field.Label>
                        <Input name="nome" value={form.nome} onChange={handleChange} />

                        <Field.Label>Idade</Field.Label>
                        <Input
                            type="number"
                            name="idade"
                            value={form.idade}
                            onChange={handleChange}
                        />

                        <Field.Label>Comum</Field.Label>
                        <Input name="comum" value={form.comum} onChange={handleChange} />

                        <Field.Label>Endereço</Field.Label>
                        <Input
                            name="endereco"
                            value={form.endereco}
                            onChange={handleChange}
                        />
                    </Field.Root>
                </Fieldset.Content>

                <Button type="submit" alignSelf="flex-start" colorScheme="blue" isLoading={loading}>
                    Salvar
                </Button>
            </Fieldset.Root>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}
