import '@mantine/core/styles.css'
import { MantineProvider, AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { shadcnTheme } from './theme/theme'
import { shadcnCssVariableResolver } from './theme/cssVariableResolver'
import { BackendProvider } from './context/BackendContext'
import { useBackend } from './hooks/useBackend'

import { BrowserRouter as Router } from 'react-router-dom'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import Footer from './components/Footer'

const theme = shadcnTheme

function AppContent(): React.JSX.Element {
  const [sidebarVisible, { toggle: toggleSidebar }] = useDisclosure(true)
  const { isBackendOnline } = useBackend()

  return (
    <Router>
      <MantineProvider
        theme={theme}
        // defaultColorScheme="dark"
        cssVariablesResolver={shadcnCssVariableResolver}
      >
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 250,
            breakpoint: 'sm',
            collapsed: { mobile: !sidebarVisible, desktop: !sidebarVisible }
          }}
          footer={{ height: 40 }}
          padding="md"
        >
          <Header toggleSidebar={toggleSidebar} />
          <Sidebar />
          <Main />
          <Footer isBackendOnline={isBackendOnline} />
        </AppShell>
      </MantineProvider>
    </Router>
  )
}

function App(): React.JSX.Element {
  return (
    <BackendProvider>
      <AppContent />
    </BackendProvider>
  )
}

export default App
