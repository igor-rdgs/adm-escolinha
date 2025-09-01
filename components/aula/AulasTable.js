"use client";

import { useEffect } from "react";
import { Table, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useAulas, useAula } from "../../hooks";

export default function AulasTable({ alunoId, jornadaId, onEdit }) {
  const { aulas, loading, error, getAulas } = useAulas();
  const { deleteAula } = useAula();

  useEffect(() => {
    if (alunoId && jornadaId) {
      getAulas(alunoId, jornadaId);
    }
  }, [alunoId, jornadaId]);

  const handleDelete = async (id) => {
    if (confirm("Deseja remover esta aula?")) {
      await deleteAula(alunoId, jornadaId, id);
      getAulas(alunoId, jornadaId);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    aulas?.data && (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Módulo</Table.ColumnHeader>
            <Table.ColumnHeader>Número</Table.ColumnHeader>
            <Table.ColumnHeader>Data</Table.ColumnHeader>
            <Table.ColumnHeader>Instrutor</Table.ColumnHeader>
            <Table.ColumnHeader>Ações</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {aulas.data.map((aula) => (
            <Table.Row key={aula.id}>
              <Table.Cell>{aula.id}</Table.Cell>
              <Table.Cell>{aula.modulo}</Table.Cell>
              <Table.Cell>{aula.numero}</Table.Cell>
              <Table.Cell>{aula.data}</Table.Cell>
              <Table.Cell>{aula.instrutor}</Table.Cell>
              <Table.Cell>
                <Flex>
                  <Button size="sm" colorScheme="blue" onClick={() => onEdit(aula)}>
                    Editar
                  </Button>
                  <Button
                    ml={2}
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(aula.id)}
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
