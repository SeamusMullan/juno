import { AppShell, Group, Title, ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'

export default function Header(): React.JSX.Element {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Title order={3}>Juno</Title>
        <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
          {colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
        </ActionIcon>
      </Group>
    </AppShell.Header>
  )
}
