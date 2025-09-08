"use client";

import { useParams } from "next/navigation";
import { useAluno, useJornada } from "@/hooks/index.js";
import { LayoutAdmin } from "@/layout";
import InputText from '../../../components/form/input.js'
import TableComponent from "@/components/dataDisplay/table/index.js";
import Modal from '@/components/modal/index.js'
import {
    Flex,
    Card,
    Table,
    Text,
    Button,
    Fieldset,
    Field,
    Input,
} from "@chakra-ui/react"
import { useEffect, useState } from "react";

const headers_table = ["id", "Instrumento", "Status", "Data de Início", "Ação"]

export default function Page() {

    const [nome, setNome] = useState("")
    const [idade, setIdade] = useState("")
    const [comum, setComum] = useState("")
    const [endereco, setEndereco] = useState("")
    const [jornadas, setJornadas] = useState([])
    const [dataJornada, setDataJornada] = useState({
        instrumento: "",
        status: "",
        data_inicio: "",
    });

    const params = useParams();
    const alunoId = params.id; // pega o ID da URL

    const { data, loading, error, reload, updateAluno, getByAluno } = useAluno(alunoId)
    const { createJornada, deleteJornada } = useJornada(alunoId)

    useEffect(() => {
        if (!data) return
        setComum(data.data.comum)
        setEndereco(data.data.endereco)
        setIdade(data.data.idade)
        setJornadas(data.data.jornadas)
        setNome(data.data.nome)

    }, [data])

    const handleUpdate = async () => {
        if (!nome?.trim() || !idade || !comum?.trim()) {
            alert("Campos não informados!")
            return
        }
        try {
            console.log("Enviando dados:", { nome, idade, comum, endereco });
            await updateAluno(alunoId, { nome, idade, comum, endereco });
            alert("Aluno atualizado com sucesso!");
        } catch {
            alert("Erro ao atualizar aluno");
        }
    };

    const handleCreate = async () => {
        if (!dataJornada.data_inicio || !dataJornada.instrumento.trim() || !dataJornada.status.trim()) {
            alert("Campos não informados")
            return
        }

        try {
            await createJornada(dataJornada);
            alert("Jornada criada com sucesso!");
            setDataJornada({ instrumento: "", status: "", data_inicio: "" });
            await getByAluno(alunoId)
        } catch {
            alert("Erro ao criar jornada");
        }

    };

    const handleDelete = async (id) => {
        if (confirm("Tem certeza que deseja deletar esta jornada?")) {
            await deleteJornada(id);
            await getByAluno(alunoId)
        }
    };

    if (loading) return <>Carregando jornadas...</>;
    if (error) return <>Erro ao carregar jornadas</>;

    return (
        <>
            <LayoutAdmin>
                <Flex width={"100%"} padding={10} marginTop={0} alignContent={"center"} justifyContent={"center"} >
                    <Flex width={"80%"} flexDirection={"column"} >
                        <Flex width={'100%'} mb={2} flexDirection={"row"} alignItems={"flex-start"} justifyContent="flex-start" >
                            <Button
                                as="a"
                                href={"/alunos/"}
                                colorScheme="teal"
                                size="sm"
                            >
                                voltar
                            </Button>
                        </Flex>
                        <Card.Root borderRadius={5} padding={5}>
                            <Text fontSize={20} fontWeight={600}>
                                Informacoes Gerais
                            </Text>
                            <Flex mt={2} flexDirection={"row"} alignItems={"center"} justifyContent="space-between" gap={4}>
                                <InputText value={nome} width='100%' name="nome" label="Nome" onChange={(e) => setNome(e.target.value)} />
                                <InputText value={idade} width='100%' name="idade" label="Idade" onChange={(e) => setIdade(e.target.value)} />
                            </Flex>
                            <Flex flexDirection={"row"} mt={3} alignItems={"center"} justifyContent="center" gap={4}    >
                                <InputText value={comum} width='100%' name="comum" label="Comum" onChange={(e) => setComum(e.target.value)} />
                                <InputText value={endereco} width='100%' name="Endereco" label="Endereço" onChange={(e) => setEndereco(e.target.value)} />
                            </Flex>

                            <Flex width={'100%'} mt={2} flexDirection={"row"} alignItems={"flex-end"} justifyContent="flex-end" >
                                <Button onClick={handleUpdate}>
                                    Salvar
                                </Button>
                            </Flex>

                        </Card.Root>

                        <Card.Root width={"100%"} padding={5} marginTop={3}>

                            <Text fontSize={20} fontWeight={600}>
                                Jornadas
                            </Text>

                            <Flex marginBottom={5} alignItems={"center"} justifyContent={"flex-end"} >
                                {jornadas && jornadas.length !== 0 && <>
                                    <Modal triggerLabel="Adicionar Jornada" cancelLabel="Cancelar" confirmLabel="Adicionar">
                                        <Fieldset.Root size="lg" maxW="md">
                                            <Fieldset.Legend>Nova Jornada</Fieldset.Legend>
                                            <Fieldset.Content>
                                                <Field.Root>
                                                    <Field.Label>Instrumento</Field.Label>
                                                    <Input
                                                        name="instrumento"
                                                        value={dataJornada.instrumento}
                                                        onChange={(e) => setDataJornada((prev) => ({ ...prev, instrumento: e.target.value }))}
                                                    />
                                                    <Field.Label>Status</Field.Label>
                                                    <Input
                                                        name="status"
                                                        value={dataJornada.status}
                                                        onChange={(e) => setDataJornada((prev) => ({ ...prev, status: e.target.value }))}
                                                    />
                                                    <Field.Label>Data de Início</Field.Label>
                                                    <Input
                                                        type="date"
                                                        name="data_inicio"
                                                        value={dataJornada.data_inicio}
                                                        onChange={(e) => setDataJornada((prev) => ({ ...prev, data_inicio: e.target.value }))}
                                                    />
                                                </Field.Root>
                                            </Fieldset.Content>
                                            <Button alignSelf="flex-start" colorScheme="blue" onClick={handleCreate}>
                                                Salvar
                                            </Button>
                                        </Fieldset.Root>
                                    </Modal>
                                </>}
                            </Flex>
                            {console.log(jornadas, '----')}
                            {jornadas && jornadas.length !== 0 && <>
                                <TableComponent headers={headers_table}  >
                                    {jornadas.map((j) => (
                                        <Table.Row key={j.id}>
                                            {console.log(j)}
                                            <Table.Cell>{j.id}</Table.Cell>
                                            <Table.Cell>{j.instrumento}</Table.Cell>
                                            <Table.Cell>{j.status}</Table.Cell>
                                            <Table.Cell>{j.data_inicio}</Table.Cell>
                                            <Table.Cell cursor={"pointer"} onClick={() => { }}>
                                                <Flex gap={2}>

                                                    <Button colorScheme="red" size="sm" onClick={() => handleDelete(j.id)}>
                                                        Remover
                                                    </Button>
                                                    <Button
                                                        as="a"
                                                        href={`/alunos/${alunoId}/jornada/${j.id}`}
                                                        colorScheme="teal"
                                                        size="sm"
                                                    >
                                                        Aulas
                                                    </Button>
                                                </Flex>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </TableComponent>
                            </>}

                        </Card.Root>
                    </Flex>
                </Flex>
            </LayoutAdmin>
        </>
    );
}
