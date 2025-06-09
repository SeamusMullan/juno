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
  Card,
  Alert
} from '@mantine/core'
import {
  IconSettings,
  IconBell,
  IconDatabase,
  IconDownload,
  IconUpload,
  IconInfoCircle
} from '@tabler/icons-react'
import { useRef, useState } from 'react'

export default function Settings(): React.JSX.Element {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handler for saving preset (download JSON)
  const handleSavePreset = (): void => {
    // Example: Save dummy preset data
    const preset = {
      projectName: 'Example',
      version: '1.0.0'
      // ...other config
    }
    const blob = new Blob([JSON.stringify(preset, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'juno-preset.json'
    a.click()
    URL.revokeObjectURL(url)
    setSuccess('Preset saved as juno-preset.json')
  }

  // Handler for loading preset (upload JSON)
  const handleLoadPreset = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setError(null)
    setSuccess(null)
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string)
        // TODO: Validate schema
        if (!data.projectName || !data.version) {
          setError('Invalid preset file: missing required fields.')
          return
        }
        setSuccess('Preset loaded successfully!')
      } catch (err) {
        setError('Invalid JSON file.\n ' + (err as Error).message)
      }
    }
    reader.readAsText(file)
  }

  return (
    <Container fluid py="xl">
      <Title order={1} mb="xl" ta="center">
        Settings
      </Title>

      <Text size="lg" c="dimmed" ta="center" mb="xl">
        Customize your Juno experience
      </Text>

      <Stack gap="lg">
        {error && (
          <Alert color="red" icon={<IconInfoCircle />}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert color="green" icon={<IconInfoCircle />}>
            {success}
          </Alert>
        )}
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

        <Group justify="center" gap="md">
          <Button leftSection={<IconDownload size={20} />} onClick={handleSavePreset}>
            Save Preset
          </Button>
          <input
            type="file"
            accept="application/json"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleLoadPreset}
          />
          <Button
            leftSection={<IconUpload size={20} />}
            onClick={() => fileInputRef.current?.click()}
          >
            Load Preset
          </Button>
          <Button leftSection={<IconSettings size={20} />}>Save Settings</Button>
        </Group>
      </Stack>
    </Container>
  )
}
