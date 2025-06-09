import '@mantine/core/styles.css'
import { MantineProvider, AppShell } from '@mantine/core'
import { shadcnTheme } from './theme/theme'
import { shadcnCssVariableResolver } from './theme/cssVariableResolver'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import Footer from './components/Footer'

const theme = shadcnTheme

function App(): React.JSX.Element {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
      cssVariablesResolver={shadcnCssVariableResolver}
    >
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 250, breakpoint: 'sm' }}
        footer={{ height: 60 }}
        padding="md"
      >
        <Header />
        <Sidebar />
        <Main />
        <Footer />
      </AppShell>
    </MantineProvider>
  )
}

export default App
