import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  TextInput,
  Textarea,
  FileInput,
  Group,
  Alert
} from '@mantine/core'
import { IconUpload, IconInfoCircle, IconCode } from '@tabler/icons-react'

export default function CustomProject(): React.JSX.Element {
  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl" ta="center">
        Custom Project Setup
      </Title>

      <Text size="lg" c="dimmed" ta="center" mb="xl">
        Import an existing project or set up a custom configuration
      </Text>

      <Alert variant="light" color="blue" icon={<IconInfoCircle />} mb="xl">
        Upload your existing project files or configure a custom project structure
      </Alert>

      <Stack gap="lg">
        <TextInput label="Project Name" placeholder="Enter your project name" size="lg" required />

        <Textarea
          label="Project Description"
          placeholder="Describe your custom project"
          rows={4}
          size="lg"
        />

        <FileInput
          label="Project Archive"
          placeholder="Upload .zip, .tar.gz, or .tar file"
          leftSection={<IconUpload size={16} />}
          size="lg"
          accept=".zip,.tar,.tar.gz"
        />

        <TextInput
          label="Git Repository URL"
          placeholder="https://github.com/username/repo.git"
          size="lg"
        />

        <Textarea
          label="Custom Configuration"
          placeholder="Enter custom build scripts, dependencies, or configuration"
          rows={6}
          size="lg"
        />

        <Group justify="center" mt="xl">
          <Button size="lg" leftSection={<IconCode size={20} />}>
            Setup Custom Project
          </Button>
        </Group>
      </Stack>
    </Container>
  )
}
