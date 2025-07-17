import { AppShell, NavLink, Stack} from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'
import {
  IconHome,
  IconSettings,
  IconPlus,
  IconTemplate,
  IconTopologyComplex
} from '@tabler/icons-react'

export default function Sidebar(): React.JSX.Element {
  const location = useLocation()

  return (
    <AppShell.Navbar p="md">
      <Stack gap="sm">
        <NavLink
          component={Link}
          to="/"
          label="Home"
          active={location.pathname === '/'}
          leftSection={<IconHome size="1rem" stroke={1.5} />}
          styles={{ label: { fontSize: '16px' } }}
        />
        <NavLink
          component={Link}
          to="/create-project"
          label="Create Project"
          active={location.pathname === '/create-project'}
          leftSection={<IconPlus size="1rem" stroke={1.5} />}
          styles={{ label: { fontSize: '16px' } }}
        />
        <NavLink
          component={Link}
          to="/custom-project"
          label="Custom Project"
          active={location.pathname === '/custom-project'}
          leftSection={<IconTopologyComplex size="1rem" stroke={1.5} />}
          styles={{ label: { fontSize: '16px' } }}
        />
        <NavLink
          component={Link}
          to="/browse-templates"
          label="Browse Templates"
          active={location.pathname === '/browse-templates'}
          leftSection={<IconTemplate size="1rem" stroke={1.5} />}
          styles={{ label: { fontSize: '16px' } }}
        />
        <NavLink
          component={Link}
          to="/settings"
          label="Settings"
          active={location.pathname === '/settings'}
          leftSection={<IconSettings size="1rem" stroke={1.5} />}
          styles={{ label: { fontSize: '16px' } }}
        />
      </Stack>
    </AppShell.Navbar>
  )
}
