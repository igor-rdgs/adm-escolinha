import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"



const customConfig = defineConfig({
  globalCss: {
    body: {
      margin: 0,
      padding: 0,
      scrollBehavior: 'smooth',
    }
  }
})



export const system = createSystem(defaultConfig, customConfig)