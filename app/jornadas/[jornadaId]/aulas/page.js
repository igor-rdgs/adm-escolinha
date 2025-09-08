"use client";

import { useParams } from "next/navigation";
import { useAulas, useAula } from "@/hooks";
import { LayoutAdmin } from "@/layout";
import TableComponent from "@/components/dataDisplay/table/index.js";
import Modal from '@/components/modal/index.js'
import CreateAulaForm from "@/components/aula/CreateAulaForm";
import EditarAulaForm from "@/components/aula/EditarAulaForm";
import {
  Flex,
  Card,
  Table,
  Button,
} from "@chakra-ui/react"

const headers_table = ["id", "Módulo", "Número", "Data", "Instrutor", "Ação"]

export default function Page() {
  const params = useParams();
  const alunoId = params.id; // pega o ID da URL
  const jornadaId = params.jornadaId

  const { aulas, loading, error, reload } = useAulas(alunoId, jornadaId)
  const { deleteAula } = useAula(alunoId, jornadaId);

  const handleDelete = async (id) => {
    if (confirm("Deseja remover esta aula?")) {
      await deleteAula(id);
      reload();
    }
  };

  if (loading) return <>Carregando aulas</>;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <>
      <LayoutAdmin>
        <Modal triggerLabel="Adicionar Jornada" cancelLabel="Cancelar" confirmLabel="Adicionar">
          <CreateAulaForm alunoId={alunoId} jornadaId={jornadaId} reload={reload} />
        </Modal>


        <Card.Root width={"100%"} padding={10} marginTop={5}>
          <Flex width={"100%"} >
            {aulas && aulas.data && <>
              <TableComponent headers={headers_table}  >
                {aulas.data.map((aula) => (
                  <Table.Row key={aula.id}>
                    <Table.Cell>{aula.id}</Table.Cell>
                    <Table.Cell>{aula.modulo}</Table.Cell>
                    <Table.Cell>{aula.numero}</Table.Cell>
                    <Table.Cell>{aula.data}</Table.Cell>
                    <Table.Cell>{aula.instrutor}</Table.Cell>
                    <Table.Cell>
                      <Flex gap={2}>
                        <Modal triggerLabel="Editar" cancelLabel="Cancelar" confirmLabel="Atualizar" >
                          <EditarAulaForm alunoId={alunoId} jornadaId={jornadaId} aula={aula} reload={reload} />
                        </Modal>
                        <Button colorScheme="red" size="sm" onClick={() => handleDelete(aula.id)}>
                          Remover
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