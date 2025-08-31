"use client";
import { Table, Flex, Button } from "@chakra-ui/react";
import { useJornadas, useJornada } from "../../hooks";

export default function JornadasTable({ alunoId, onEdit }) {
  const { loading, jornadas, error, reload } = useJornadas(alunoId);
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
    jornadas && jornadas.data && (
      <Table.Root size="sm" mt={6}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Instrumento</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Data Início</Table.ColumnHeader>
            <Table.ColumnHeader>Ações</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {jornadas.data.map((jornada) => (
            <Table.Row key={jornada.id}>
              <Table.Cell>{jornada.id}</Table.Cell>
              <Table.Cell>{jornada.instrumento}</Table.Cell>
              <Table.Cell>{jornada.status}</Table.Cell>
              <Table.Cell>{jornada.data_inicio}</Table.Cell>
              <Table.Cell>
                <Flex>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    mr={2}
                    onClick={() => onEdit(jornada)}
                  >
                    Editar
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDelete(jornada.id)}
                  >
                    Remover
                  </Button>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    )
  );
}
