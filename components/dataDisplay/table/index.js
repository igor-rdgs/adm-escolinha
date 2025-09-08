import { Table } from "@chakra-ui/react"



function Index({ headers = [], children }) {
  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" height="100%" width={"100%"}>
      <Table.Root size="sm" stickyHeader>
        <Table.Header>
          <Table.Row bg="bg.subtle">
            {headers.map((item) => (

              <Table.ColumnHeader key={item}>{item}</Table.ColumnHeader>

            ))}

          </Table.Row>
        </Table.Header>

        <Table.Body>
          {children}

        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}

export default Index