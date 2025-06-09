import { AppShell, Group, Title, ActionIcon, useMantineColorScheme, Burger } from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'

interface HeaderProps {
  toggleSidebar: () => void
}

export default function Header({ toggleSidebar }: HeaderProps): React.JSX.Element {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Group>
          <Burger onClick={toggleSidebar} size="sm" />
          <Title order={3}>Juno</Title>
        </Group>
        <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
          {colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
        </ActionIcon>
      </Group>
    </AppShell.Header>
  )
}
