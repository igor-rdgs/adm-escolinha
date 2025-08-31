"use client"
import { Table, Flex, Button } from "@chakra-ui/react"
import { useAlunos, useAluno } from '../../hooks'

export default function AlunosTable({ onEdit }) {
    const { loading, alunos, error, reload } = useAlunos()
    const { deleteAluno } = useAluno();

    const handleDelete = async (id) => {
        await deleteAluno(id);
        reload()
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
        alunos && alunos.data && <>
            <Table.Root size="sm">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Id</Table.ColumnHeader>
                        <Table.ColumnHeader>Nome</Table.ColumnHeader>
                        <Table.ColumnHeader>Idade</Table.ColumnHeader>
                        <Table.ColumnHeader>Comum</Table.ColumnHeader>
                        <Table.ColumnHeader>Endereço</Table.ColumnHeader>
                        <Table.ColumnHeader>Ações</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {alunos.data.map((aluno) => (
                        <Table.Row key={aluno.id}>
                            <Table.Cell>{aluno.id}</Table.Cell>
                            <Table.Cell>{aluno.nome}</Table.Cell>
                            <Table.Cell>{aluno.idade}</Table.Cell>
                            <Table.Cell>{aluno.comum}</Table.Cell>
                            <Table.Cell>{aluno.endereco}</Table.Cell>
                            <Table.Cell>
                                <Flex gap={2}>
                                    <Button colorScheme="blue" size="sm" onClick={() => onEdit(aluno)}>
                                        Editar
                                    </Button>
                                    <Button colorScheme="red" size="sm" onClick={() => handleDelete(aluno.id)}>
                                        Remover
                                    </Button>
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    )
}