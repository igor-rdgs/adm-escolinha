import { Grid, GridItem, Flex, Text, Button } from '@chakra-ui/react'
import { useRouter } from "next/navigation"

export default function Index({ children }) {
  const router = useRouter()

  return (
    <Grid
      templateAreas={`"header" "main"`}
      gridTemplateRows={'auto 1fr'}
      gridTemplateColumns={'1fr'}
      h="100vh"
      overflow="hidden"
      gap="0"
    >
      <GridItem area="header">
        <div style={{ background: "#4d4d4d0f", height: 100, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Text as='h1' fontSize="20px" fontWeight={800} >Congregação Cristã no Brasil</Text>
          <Button position={'absolute'} left={'84%'}
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              router.push("/login");
            }}
          >
            Sair
          </Button>
        </div>

      </GridItem>

      <GridItem overflow="auto" area="main">
        <Flex overflow="overlay" height="100%" align="center" flexDirection="column" padding={0}>
          {children}
        </Flex>
      </GridItem>
    </Grid>
  )
}
