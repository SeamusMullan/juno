import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'

import { shadcnTheme } from './theme/theme'
import { shadcnCssVariableResolver } from './theme/cssVariableResolver'

const theme = shadcnTheme

function App(): React.JSX.Element {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
      cssVariablesResolver={shadcnCssVariableResolver}
    >
      <p>test</p>
    </MantineProvider>
  )
}

export default App
