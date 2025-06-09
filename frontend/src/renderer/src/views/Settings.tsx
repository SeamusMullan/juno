import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Switch,
  Select,
  Divider,
  Group,
  Card
} from '@mantine/core'
import { IconSettings, IconBell, IconDatabase } from '@tabler/icons-react'

export default function Settings(): React.JSX.Element {
  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl" ta="center">
        Settings
      </Title>

      <Text size="lg" c="dimmed" ta="center" mb="xl">
        Customize your Juno experience
      </Text>

      <Stack gap="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group mb="md">
            <IconBell size={24} />
            <Title order={3}>Notifications</Title>
          </Group>

          <Stack gap="md">
            <Switch
              label="Project build notifications"
              description="Get notified when builds complete"
              defaultChecked
            />

            <Switch
              label="Error alerts"
              description="Show desktop notifications for errors"
              defaultChecked
            />

            <Switch
              label="Update notifications"
              description="Notify about application updates"
              defaultChecked
            />
          </Stack>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group mb="md">
            <IconDatabase size={24} />
            <Title order={3}>Project Settings</Title>
          </Group>

          <Stack gap="md">
            <Select
              label="Default Project Location"
              placeholder="Select default folder"
              data={[
                { value: 'documents', label: 'Documents' },
                { value: 'desktop', label: 'Desktop' },
                { value: 'custom', label: 'Custom Location' }
              ]}
              defaultValue="documents"
            />

            <Switch
              label="Auto-save projects"
              description="Automatically save project changes"
              defaultChecked
            />

            <Switch label="Auto-backup" description="Create automatic backups of projects" />
          </Stack>
        </Card>

        <Divider />

        <Group justify="center">
          <Button leftSection={<IconSettings size={20} />}>Save Settings</Button>
        </Group>
      </Stack>
    </Container>
  )
}
