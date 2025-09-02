"use client";

import { useParams } from "next/navigation";
import { useJornadas, useJornada } from "@/hooks/index.js";
import { LayoutAdmin } from "@/layout";
import TableComponent from "../../../../components/dataDisplay/table/index.js";
import Modal from '../../../../components/modal/index.js'
import CreateJornadaForm from "@/components/jornada/CreateJornadaForm.js";
import EditarJornadaForm from "@/components/jornada/EditarJornadaForm.js";
import {
	Flex, 
	Card,
	Table,
	Button
} from "@chakra-ui/react"

const headers_table = ["id", "Instrumento", "Status", "Data de Início", "Ação"]

export default function Page() {
  const params = useParams();
  const alunoId = params.id; // pega o ID da URL

  const { jornadas, reload, loading, error} = useJornadas(alunoId)

  const { deleteJornada } = useJornada(alunoId);

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
				<Modal triggerLabel="Adicionar Jornada" cancelLabel="Cancelar" confirmLabel="Adicionar">
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
				</Card.Root>
			</LayoutAdmin>
		</>
	);
}
