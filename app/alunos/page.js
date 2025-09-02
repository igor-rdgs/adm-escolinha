"use client";

import Alunos from "@/components/aluno/page"; // ajuste o caminho se necessário

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


	return (
		<>



			<LayoutAdmin>
				<Modal triggerLabel="Adicionar Aluno" cancelLabel="Cancelar"  confirmLabel="Adicionar">
					<p>Aqui você pode colocar qualquer conteúdo, como texto ou formulários.</p>
				</Modal>

				<Card.Root width={"100%"} padding={10} >
					<Flex width={"100%"} >
						<TableComponent headers={headers_table}  >
							{DATA_MOCK.map((item) => (
								<Table.Row key={item.id}>
									<Table.Cell>{item.id}</Table.Cell>
									<Table.Cell>{item.nome}</Table.Cell>
									<Table.Cell>{item.idade}</Table.Cell>
									<Table.Cell>{item.comum}</Table.Cell>
									<Table.Cell>{item.endereco}</Table.Cell>
									<Table.Cell cursor={"pointer"} onClick={() => {

									}}>Detalhes</Table.Cell>
								</Table.Row>
							))}
						</TableComponent>
					</Flex>
				</Card.Root>
			</LayoutAdmin>
		</>
	);
}
