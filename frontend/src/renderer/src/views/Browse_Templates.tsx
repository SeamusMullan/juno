import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Badge,
  Button,
  Group,
  Radio,
  Stack,
  TextInput,
  Select,
  Divider,
  Tooltip,
  ActionIcon,
  Alert
} from '@mantine/core'
import {
  IconTemplate,
  IconDownload,
  IconStar,
  IconFolder,
  IconInfoCircle
} from '@tabler/icons-react'
import { useState } from 'react'

// Define a mock templates array to resolve 'templates' not found error
interface Template {
  id: string
  name: string
  description: string
  tags: string[]
  downloads: number
  rating: number
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Starter App',
    description: 'A basic starter template for new projects.',
    tags: ['starter', 'basic'],
    downloads: 1234,
    rating: 4.5
  },
  {
    id: '2',
    name: 'Dashboard',
    description: 'A dashboard template with charts and tables.',
    tags: ['dashboard', 'charts'],
    downloads: 5678,
    rating: 4.8
  }
]

export default function BrowseTemplates(): React.JSX.Element {
  const [source, setSource] = useState<'predefined' | 'repository' | 'local'>('predefined')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [repoUrl, setRepoUrl] = useState('')
  const [repoBranch, setRepoBranch] = useState('main')
  const [localDir, setLocalDir] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Handler for local directory selection (placeholder for Electron dialog)
  const handleSelectLocalDir = async (): Promise<void> => {
    const dir = prompt('Enter local template directory path:')
    if (dir) setLocalDir(dir)
  }

  // Handler for using template
  const handleUseTemplate = (): void => {
    setError(null)
    setSuccess(null)
    if (source === 'predefined' && !selectedTemplate) {
      setError('Please select a predefined template.')
      return
    }
    if (source === 'repository' && !repoUrl) {
      setError('Please enter a repository URL.')
      return
    }
    if (source === 'local' && !localDir) {
      setError('Please select a local template directory.')
      return
    }
    setSuccess('Template setup started! (API call not implemented)')
  }
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl" ta="center">
        Browse Templates
      </Title>

      <Text size="lg" c="dimmed" ta="center" mb="xl">
        Choose from predefined, repository, or local templates
      </Text>

      <Stack gap="lg" mb="xl">
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
        <Group>
          <Radio.Group
            value={source}
            onChange={(v) => setSource(v as 'predefined' | 'repository' | 'local')}
            name="template-source"
            label="Template Source"
          >
            <Group>
              <Radio value="predefined" label="Predefined" />
              <Radio value="repository" label="Repository" />
              <Radio value="local" label="Local Template" />
            </Group>
          </Radio.Group>
        </Group>
        {source === 'predefined' && (
          <Select
            label="Predefined Template"
            placeholder="Select a template"
            data={templates.map((t) => ({ value: t.name, label: t.name }))}
            value={selectedTemplate}
            onChange={setSelectedTemplate}
            required
          />
        )}
        {source === 'repository' && (
          <Group gap="sm" align="end">
            <TextInput
              label="Repository URL"
              placeholder="https://github.com/username/repo.git"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              required
            />
            <TextInput
              label="Branch"
              placeholder="main"
              value={repoBranch}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepoBranch(e.target.value)}
            />
          </Group>
        )}
        {source === 'local' && (
          <Group gap="sm" align="end">
            <TextInput
              label="Template Directory"
              placeholder="Select local template folder"
              value={localDir}
              readOnly
              required
            />
            <Tooltip label="Browse for local template directory">
              <ActionIcon
                variant="light"
                onClick={handleSelectLocalDir}
                mt={24}
                aria-label="Select Local Directory"
              >
                <IconFolder size={20} />
              </ActionIcon>
            </Tooltip>
          </Group>
        )}
        <Button onClick={handleUseTemplate} mt="md">
          Use Template
        </Button>
      </Stack>

      <Divider mb="xl" />

      <Title order={2} mb="lg" ta="center">
        Template Library
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {templates.map((template) => (
          <Card key={template.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section p="lg">
              <Group justify="space-between" align="flex-start" mb="md">
                <IconTemplate size={32} />
                <Group gap="xs">
                  <IconStar size={16} fill="gold" color="gold" />
                  <Text size="sm" fw={500}>
                    {template.rating}
                  </Text>
                </Group>
              </Group>

              <Title order={3} mb="sm">
                {template.name}
              </Title>

              <Text size="sm" c="dimmed" mb="md">
                {template.description}
              </Text>

              <Group gap="xs" mb="md">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="light" size="sm">
                    {tag}
                  </Badge>
                ))}
              </Group>

              <Group justify="space-between" align="center">
                <Group gap="xs">
                  <IconDownload size={16} />
                  <Text size="sm" c="dimmed">
                    {template.downloads.toLocaleString()}
                  </Text>
                </Group>

                <Button
                  size="sm"
                  variant="light"
                  onClick={() => {
                    setSource('predefined')
                    setSelectedTemplate(template.name)
                  }}
                >
                  Use Template
                </Button>
              </Group>
            </Card.Section>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  )
}
