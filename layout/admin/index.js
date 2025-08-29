import { Grid, GridItem, Flex } from '@chakra-ui/react'


export default function Index({children}) {
  return <>
       <Grid
            templateAreas={`"header header" "nav main"`}
            gridTemplateRows={'auto 1fr'}
            gridTemplateColumns={'260px 1fr'}
            h="100vh"
            overflow={"hidden"}
            gap="0"
        >
            <GridItem area={'header'}>
                <div style={{background: "red", height: 100, width: "100%"}}>
                    
                </div>
            </GridItem>
            <GridItem area={'nav'}>
                <div style={{background: "green", height: "100%", width: "100%"}}>

                </div>
            </GridItem>
            <GridItem overflow={'auto'} area={'main'}>
                <Flex overflow='overlay' height='100%' align={'center'} flexDirection={"column"}>
                    {children}
                </Flex>
            </GridItem>
        </Grid>
  </>
}

