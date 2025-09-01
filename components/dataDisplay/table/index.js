import { Table } from "@chakra-ui/react"

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
]


function Index({headers = [], dataTable=[]}) {
    return (
          <Table.ScrollArea borderWidth="1px" rounded="md" height="160px">
      <Table.Root size="sm" stickyHeader>
        <Table.Header>
          <Table.Row bg="bg.subtle">
                {headers.map((item) => (
      
             <Table.ColumnHeader>{item}</Table.ColumnHeader>
     
          ))}
           
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {dataTable.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>nome</Table.Cell>
              <Table.Cell>nome</Table.Cell>
            
            </Table.Row>
          ))}
          
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
    )
}

export default Index