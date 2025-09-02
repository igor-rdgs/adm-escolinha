"use client";

import { useAlunos, useAluno } from "@/hooks/index.js";
import { LayoutAdmin } from "@/layout";
import { Flex, Card } from "@chakra-ui/react"
import { Table } from "@chakra-ui/react"
import TableComponent from '../../components/dataDisplay/table/index.js'
import Modal from '../../components/modal/index.js'
import {
	Button,
	Dialog,
	Portal,
} from "@chakra-ui/react"


const DATA_MOCK = [
	{
		"id": 1,
		"nome": "vitor melo",
		"idade": 19,
		"comum": "Taguatinga",
		"endereco": "qnl 01 bloco c",
		"created_at": "2025-08-23T19:55:33.147Z",
		"updated_at": "2025-08-23T19:55:33.147Z",
		"jornadas": []
	}
]


const headers_table = ["id", "Nome", "Idade", "Comum", "Endereco", "Acao"]

export default function Page() {
	const { alunos, error, loading, reload } = useAlunos()

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
				<Modal triggerLabel="Adicionar Aluno" cancelLabel="Cancelar" confirmLabel="Adicionar">
					<p>Aqui você pode colocar qualquer conteúdo, como texto ou formulários.</p>
				</Modal>

				<Card.Root width={"100%"} padding={10} >
					<Flex width={"100%"} >
						{alunos && alunos.data && <>
							<TableComponent headers={headers_table}  >
								{alunos.data.map((aluno) => (
									<Table.Row key={aluno.id}>
										<Table.Cell>{aluno.id}</Table.Cell>
										<Table.Cell>{aluno.nome}</Table.Cell>
										<Table.Cell>{aluno.idade}</Table.Cell>
										<Table.Cell>{aluno.comum}</Table.Cell>
										<Table.Cell>{aluno.endereco}</Table.Cell>
										<Table.Cell cursor={"pointer"} onClick={() => {}}>Detalhes</Table.Cell>
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
