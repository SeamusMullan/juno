import { AppShell, Divider, NavLink, Stack, Text } from '@mantine/core'
import {
  IconHome,
  IconSettings,
  IconPlus,
  IconTemplate,
  IconTopologyComplex
} from '@tabler/icons-react'

export default function Sidebar(): React.JSX.Element {
  return (
    <AppShell.Navbar p="md">
      <Stack gap="sm">
        <Text size="xl" fw={500} c="dimmed" mb="sm" ta="center">
          Navigation
        </Text>
        {/* Home, Create Project, Custom Project, Browse Templates, Settings */}
        <Divider size="sm" mb="sm" />
        <NavLink
          href="#"
          label="Home"
          leftSection={<IconHome size="1rem" stroke={1.5} />}
          styles={{ label: { fontSize: '16px' } }}
        />
        <NavLink
          href="#"
          label="Create Project"
          leftSection={<IconPlus size="1rem" stroke={1.5} />}
          styles={{ label: { fontSize: '16px' } }}
        />
        <NavLink
          href="#"
          label="Custom Project"
          leftSection={<IconTopologyComplex size="1rem" stroke={1.5} />}
          styles={{ label: { fontSize: '16px' } }}
        />
        <NavLink
          href="#"
          label="Browse Templates"
          leftSection={<IconTemplate size="1rem" stroke={1.5} />}
          styles={{ label: { fontSize: '16px' } }}
        />
        <NavLink
          href="#"
          label="Settings"
          leftSection={<IconSettings size="1rem" stroke={1.5} />}
          styles={{ label: { fontSize: '16px' } }}
        />
      </Stack>
    </AppShell.Navbar>
  )
}
