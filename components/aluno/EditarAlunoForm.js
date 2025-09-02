"use client";

import { useState, useEffect } from "react";
import { Button, Input, Fieldset, Field, Flex } from "@chakra-ui/react";
import { useAluno } from "../../hooks";

export default function EditarAlunoForm({ aluno, reload, onCancel }) {
    const { updateAluno, loading, error } = useAluno();
    const [form, setForm] = useState({
        nome: "",
        idade: "",
        comum: "",
        endereco: "",
    });

    useEffect(() => {
        if (aluno) {
            setForm({
                nome: aluno.nome,
                idade: aluno.idade,
                comum: aluno.comum,
                endereco: aluno.endereco || "",
            });
        }
    }, [aluno]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.nome.trim() || !form.idade || !form.comum.trim()) {
            alert("Campos não informados!")
            return
        }
        try {
            await updateAluno(aluno.id, form);
            alert("Aluno atualizado com sucesso!");
            reload(); // atualiza a tabela
            onCancel(); // fecha o form

        } catch {
            alert("Erro ao atualizar aluno");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Fieldset.Root size="lg" maxW="md">
                <Fieldset.Legend>Editar Aluno</Fieldset.Legend>

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
                <Flex gap={2}>
                    <Button
                        type="submit"
                        alignSelf="flex-start"
                        colorScheme="green"
                        isLoading={loading}
                    >
                        Atualizar
                    </Button>
                </Flex>
            </Fieldset.Root>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}
