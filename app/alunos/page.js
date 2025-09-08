"use client";

import { useAlunos, useAluno } from "@/hooks/index.js";
import { LayoutAdmin } from "@/layout";
import TableComponent from '../../components/dataDisplay/table/index.js'
import Modal from '../../components/modal/index.js'
import CreateAlunoForm from "@/components/aluno/CreateAlunoForm.js";

import {
	Flex,
	Card,
	Table,
	Button,
	Box
} from "@chakra-ui/react"




const headers_table = ["id", "Nome", "Idade", "Comum", "Endereco", "Acao"]

export default function Page() {
	const { alunos, error, loading, reload } = useAlunos()

	const { deleteAluno } = useAluno();

	const handleDelete = async (id) => {
		if (confirm("Deseja remover este aluno?")) {
			await deleteAluno(id);
			return reload()
		}
	};

	if (loading) {
		return <>
			Carregando
		</>
	}

	if (error) {
		return <>
			erro ao carregar pagina
			<button onClick={reload}>
				carregar novamente
			</button>
		</>
	}

	return (
		<>
			<LayoutAdmin>



				<Flex width={"100%"} padding={10} marginTop={5} alignContent={"center"} justifyContent={"center"} >

					<Flex width={"80%"} flexDirection={"column"} >
						<Flex width={"100%"} justifyContent={"flex-end"} marginBottom={5}>
							<Modal triggerLabel="Adicionar Aluno" cancelLabel="Cancelar" confirmLabel="Adicionar">
								<CreateAlunoForm reload={reload} />
							</Modal>
						</Flex>

						{alunos && alunos.data && <>
							<TableComponent headers={headers_table}  >
								{alunos.data.map((aluno) => (
									<Table.Row key={aluno.id}>
										<Table.Cell>{aluno.id}</Table.Cell>
										<Table.Cell>{aluno.nome}</Table.Cell>
										<Table.Cell>{aluno.idade}</Table.Cell>
										<Table.Cell>{aluno.comum}</Table.Cell>
										<Table.Cell>{aluno.endereco}</Table.Cell>
										<Table.Cell cursor={"pointer"} onClick={() => { }}>
											<Flex gap={2}>
												{/* <Modal triggerLabel="Editar" cancelLabel="Cancelar" confirmLabel="Atualizar" >
													<EditarAlunoForm aluno={aluno} reload={reload} />
												</Modal> */}
												<Button colorScheme="red" size="sm" onClick={() => handleDelete(aluno.id)}>
													Remover
												</Button>
												<Button
													as="a"
													href={`/alunos/${aluno.id}`}
													colorScheme="teal"
													size="sm"
												>
													detalhes
												</Button>
											</Flex>
										</Table.Cell>
									</Table.Row>
								))}
							</TableComponent>
						</>}
					</Flex>
				</Flex>
			</LayoutAdmin>
		</>
	);
}
