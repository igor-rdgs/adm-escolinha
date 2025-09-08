"use client";

import { useParams } from "next/navigation";
import { useAluno } from "@/hooks/index.js";
import { LayoutAdmin } from "@/layout";
import InputText from '../../../components/form/input.js'
import TableComponent from "@/components/dataDisplay/table/index.js";
import Modal from '@/components/modal/index.js'
import CreateJornadaForm from "@/components/jornada/CreateJornadaForm.js";
import EditarJornadaForm from "@/components/jornada/EditarJornadaForm.js";
import {
    Flex,
    Card,
    Table,
    Text,
    Button
} from "@chakra-ui/react"
import { useEffect, useState } from "react";

const headers_table = ["id", "Instrumento", "Status", "Data de Início", "Ação"]

export default function Page() {

    const [name, setName] = useState()
    const [idade, setIdade] = useState()
    const [comum, setComum] = useState()
    const [endereco, setEndereco] = useState()
    const [jornada, setJornada] = useState([])

    const params = useParams();
    const alunoId = params.id; // pega o ID da URL

    const { data, loading, error , reload} = useAluno(alunoId)

    useEffect(() => {
        if (!data) return
        setComum(data.data.comum)
        setEndereco(data.data.endereco)
        setIdade(data.data.idade)
        setJornada(data.data.jornadas)
        setName(data.data.nome)

    }, [data])

    const handleDelete = async (id) => {
        if (confirm("Tem certeza que deseja deletar esta jornada?")) {
            await deleteJornada(id);
            reload();
        }
    };

    if (loading) return <>Carregando jornadas...</>;
    if (error) return <>Erro ao carregar jornadas</>;

    return (
        <>
            <LayoutAdmin>
                <Flex width={"100%"} padding={10} marginTop={0} alignContent={"center"} justifyContent={"center"} >
                    <Flex width={"80%"} flexDirection={"column"} >
                        <Card.Root borderRadius={5} padding={5}>
                            <Text fontSize={20} fontWeight={600}>
                                Informacoes Gerais
                            </Text>
                            <Flex mt={2} flexDirection={"row"} alignItems={"center"} justifyContent="space-between" >
                                <InputText value={name} width='90%' name="nome" label="Nome" />
                                <InputText value={idade} width='90%' name="idade" label="idade" />
                            </Flex>
                            <Flex flexDirection={"row"} mt={3} alignItems={"center"} justifyContent="center" >
                                <InputText value={comum} width='90%' name="comum" label="comum" />
                                <InputText value={endereco} width='90%' name="Endereco" label="Endereco" />
                            </Flex>

                            <Flex width={'100%'} mt={2} flexDirection={"row"} alignItems={"flex-end"} justifyContent="flex-end" >
                                <Button>
                                    Salvar
                                </Button>
                            </Flex>

                        </Card.Root>

                        <Card.Root width={"100%"} padding={5} marginTop={3}>

                            <Text   fontSize={20} fontWeight={600}>
                                Jornadas
                            </Text>

                            <Flex  marginBottom={5} alignItems={"center"} justifyContent={"center"} >
                                {jornada && jornada.length === 0 && <>
                                <Button>
                                    Clique para criar uma jornada
                                </Button>
                                </>}
                            </Flex>
                                    {console.log(jornada ,'----')}
	{jornada  && jornada.length !== 0 && <>
							<TableComponent headers={headers_table}  >
								{jornada.map((j) => (
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
													href={`/alunos/${alunoId}/jornadas/${j.id}/aulas`}
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



                {/* <Modal triggerLabel="Adicionar Jornada" cancelLabel="Cancelar" confirmLabel="Adicionar">
					<CreateJornadaForm alunoId={alunoId} reload={reload} />
				</Modal>


				<Card.Root width={"100%"} padding={10} marginTop={5}>
					<Flex width={"100%"} >
						{jornadas && jornadas.data && <>
							<TableComponent headers={headers_table}  >
								{jornadas.data.map((jornada) => (
									<Table.Row key={jornada.id}>
										<Table.Cell>{jornada.id}</Table.Cell>
										<Table.Cell>{jornada.instrumento}</Table.Cell>
										<Table.Cell>{jornada.status}</Table.Cell>
										<Table.Cell>{jornada.data_inicio}</Table.Cell>
										<Table.Cell cursor={"pointer"} onClick={() => { }}>
											<Flex gap={2}>
												<Modal triggerLabel="Editar" cancelLabel="Cancelar" confirmLabel="Atualizar" >
													<EditarJornadaForm alunoId={alunoId} jornada={jornada} reload={reload} />
												</Modal>
												<Button colorScheme="red" size="sm" onClick={() => handleDelete(jornada.id)}>
													Remover
												</Button>
												<Button
													as="a"
													href={`/alunos/${alunoId}/jornadas/${jornada.id}/aulas`}
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
					</Flex>
				</Card.Root> */}
            </LayoutAdmin>
        </>
    );
}
