"use client";

import { useParams } from "next/navigation";
import { useJornada, useAula } from "@/hooks/index.js";
import { LayoutAdmin } from "@/layout";
import InputText from '@/components/form/input.js'
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

const headers_table = ["id", "Módulo", "Número", "Instrutor", "Data", "Ação"]

export default function Page() {

    const [instrumento, setInstrumento] = useState("")
    const [status, setStatus] = useState("")
    const [data_inicio, setDataInicio] = useState("")
    const [aulas, setAulas] = useState([])
    const [dataAula, setDataAula] = useState({
        modulo: "",
        numero: "",
        instrutor: "",
        data: ""
    });

    const params = useParams();
    const alunoId = params.id; // pega o ID da URL
    const jornadaId = params.jornadaId;

    const { data, loading, error, updateJornada, getByJornada } = useJornada(alunoId, jornadaId)
    const { createAula, deleteAula } = useAula(alunoId, jornadaId)

    useEffect(() => {
        if (!data) return
        setInstrumento(data.data.instrumento)
        setStatus(data.data.status)
        setDataInicio(data.data.data_inicio)
        setAulas(data.data.aulas)
    }, [data])

    const handleUpdate = async () => {
        if (!instrumento?.trim() || !status?.trim() || !data_inicio?.trim()) {
            alert("Campos não informados!")
            return
        }
        try {
            console.log("Enviando dados:", { instrumento, status, data_inicio });
            await updateJornada(jornadaId, { instrumento, status, data_inicio });
            alert("Jornada atualizada com sucesso!");
        } catch {
            alert("Erro ao atualizar jornada");
        }
    };

    const handleCreate = async () => {
        if (!dataAula.modulo.trim() || !dataAula.numero.trim() || !dataAula.instrutor.trim() || !dataAula.data.trim()) {
            alert("Campos não informados")
            return
        }

        try {
            await createAula(dataAula);
            alert("Aula criada com sucesso!");
            setDataAula({ modulo: "", numero: "", instrutor: "", data: "" });
            await getByJornada(jornadaId)
        } catch {
            alert("Erro ao criar aula");
        }

    };

    const handleDelete = async (id) => {
        if (confirm("Tem certeza que deseja deletar esta aula?")) {
            await deleteAula(id);
            await getByJornada(jornadaId)
        }
    };

    if (loading) return <>Carregando aulas...</>;
    if (error) return <>Erro ao carregar aulas</>;

    return (
        <>
            <LayoutAdmin>
                <Flex width={"100%"} padding={10} marginTop={0} alignContent={"center"} justifyContent={"center"} >
                    <Flex width={"80%"} flexDirection={"column"} >
                        <Flex width={'100%'} mb={2} flexDirection={"row"} alignItems={"flex-start"} justifyContent="flex-start" >
                            <Button
                                as="a"
                                href={`/alunos/${alunoId}`}
                                colorScheme="teal"
                                size="sm"
                            >
                                voltar
                            </Button>
                        </Flex>
                        <Card.Root borderRadius={5} padding={5}>
                            <Text fontSize={20} fontWeight={600}>
                                Jornada
                            </Text>
                            <Flex mt={2} flexDirection={"row"} alignItems={"center"} justifyContent="space-between" gap={4}>
                                <InputText value={instrumento} width='100%' name="instrumento" label="Instrumento" onChange={(e) => setInstrumento(e.target.value)} />
                                <InputText value={status} width='100%' name="status" label="Status" onChange={(e) => setStatus(e.target.value)} />
                                <InputText value={data_inicio} width='100%' name="data_inicio" label="Data de Início" onChange={(e) => setDataInicio(e.target.value)} />
                            </Flex>

                            <Flex width={'100%'} mt={2} flexDirection={"row"} alignItems={"flex-end"} justifyContent="flex-end" >
                                <Button onClick={handleUpdate}>
                                    Salvar
                                </Button>
                            </Flex>

                        </Card.Root>

                        <Card.Root width={"100%"} padding={5} marginTop={3}>

                            <Text fontSize={20} fontWeight={600}>
                                Aulas
                            </Text>

                            <Flex marginBottom={5} alignItems={"center"} justifyContent={"flex-end"} >
                                {aulas && aulas.length !== 0 && <>
                                    <Modal triggerLabel="Adicionar Aula" cancelLabel="Cancelar" confirmLabel="Adicionar">
                                        <Fieldset.Root size="lg" maxW="md">
                                            <Fieldset.Legend>Nova Aula</Fieldset.Legend>
                                            <Fieldset.Content>
                                                <Field.Root>
                                                    <Field.Label>Módulo</Field.Label>
                                                    <Input
                                                        name="modulo"
                                                        value={dataAula.modulo}
                                                        onChange={(e) => setDataAula((prev) => ({ ...prev, modulo: e.target.value }))}
                                                    />
                                                    <Field.Label>Número</Field.Label>
                                                    <Input
                                                        name="numero"
                                                        value={dataAula.numero}
                                                        onChange={(e) => setDataAula((prev) => ({ ...prev, numero: e.target.value }))}
                                                    />
                                                    <Field.Label>Instrutor</Field.Label>
                                                    <Input
                                                        name="instrutor"
                                                        value={dataAula.instrutor}
                                                        onChange={(e) => setDataAula((prev) => ({ ...prev, instrutor: e.target.value }))}
                                                    />
                                                    <Field.Label>Data</Field.Label>
                                                    <Input
                                                        type="date"
                                                        name="data"
                                                        value={data.instrutor}
                                                        onChange={(e) => setDataAula((prev) => ({ ...prev, data: e.target.value }))}
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
                            {console.log(aulas, '----')}
                            {aulas && aulas.length !== 0 && <>
                                <TableComponent headers={headers_table}  >
                                    {aulas.map((a) => (
                                        <Table.Row key={a.id}>
                                            {console.log(a)}
                                            <Table.Cell>{a.id}</Table.Cell>
                                            <Table.Cell>{a.modulo}</Table.Cell>
                                            <Table.Cell>{a.numero}</Table.Cell>
                                            <Table.Cell>{a.instrutor}</Table.Cell>
                                            <Table.Cell>{a.data}</Table.Cell>
                                            <Table.Cell cursor={"pointer"} onClick={() => { }}>
                                                <Flex gap={2}>
                                                    <Button colorScheme="red" size="sm" onClick={() => handleDelete(a.id)}>
                                                        Remover
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
