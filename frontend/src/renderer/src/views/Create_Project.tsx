import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  TextInput,
  Textarea,
  Select,
  Group
} from '@mantine/core'
import { IconRocket } from '@tabler/icons-react'

export default function CreateProject(): React.JSX.Element {
  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl" ta="center">
        Create New Project
      </Title>

      <Text size="lg" c="dimmed" ta="center" mb="xl">
        Set up a new project with our guided wizard
      </Text>

      <Stack gap="lg">
        <TextInput label="Project Name" placeholder="Enter your project name" size="lg" required />

        <Textarea
          label="Project Description"
          placeholder="Describe what your project does"
          rows={4}
          size="lg"
        />

        <Select
          label="Project Type"
          placeholder="Select project type"
          size="lg"
          data={[
            { value: 'web', label: 'Web Application' },
            { value: 'mobile', label: 'Mobile App' },
            { value: 'desktop', label: 'Desktop Application' },
            { value: 'api', label: 'API/Backend Service' },
            { value: 'library', label: 'Library/Package' }
          ]}
        />

        <Select
          label="Technology Stack"
          placeholder="Choose your tech stack"
          size="lg"
          data={[
            { value: 'react', label: 'React + TypeScript' },
            { value: 'vue', label: 'Vue.js' },
            { value: 'angular', label: 'Angular' },
            { value: 'node', label: 'Node.js' },
            { value: 'python', label: 'Python' },
            { value: 'rust', label: 'Rust' }
          ]}
        />

        <Group justify="center" mt="xl">
          <Button size="lg" leftSection={<IconRocket size={20} />}>
            Create Project
          </Button>
        </Group>
      </Stack>
    </Container>
  )
}
