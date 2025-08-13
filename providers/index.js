import UiProvider from './uiProvider'

function Index({children}) {
  return <>
  <UiProvider>
      {children}
    </UiProvider>
  </>
}

export default Index