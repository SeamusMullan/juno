import { Container, Title, Text, Card, SimpleGrid, Button } from '@mantine/core'
import { IconHome, IconPlus, IconTemplate } from '@tabler/icons-react'

export default function Home(): React.JSX.Element {
  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl" ta="center">
        Welcome to Juno
      </Title>

      <Text size="lg" c="dimmed" ta="center" mb="xl">
        Your project management and development platform
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section p="lg">
            <IconPlus size={48} style={{ display: 'block', margin: '0 auto 16px' }} />
            <Title order={3} ta="center" mb="sm">
              Create Project
            </Title>
            <Text size="sm" c="dimmed" ta="center" mb="md">
              Start a new project from scratch with our guided setup
            </Text>
            <Button variant="light" fullWidth>
              Get Started
            </Button>
          </Card.Section>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section p="lg">
            <IconTemplate size={48} style={{ display: 'block', margin: '0 auto 16px' }} />
            <Title order={3} ta="center" mb="sm">
              Browse Templates
            </Title>
            <Text size="sm" c="dimmed" ta="center" mb="md">
              Choose from pre-built templates to jumpstart your project
            </Text>
            <Button variant="light" fullWidth>
              Browse Templates
            </Button>
          </Card.Section>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section p="lg">
            <IconHome size={48} style={{ display: 'block', margin: '0 auto 16px' }} />
            <Title order={3} ta="center" mb="sm">
              Recent Projects
            </Title>
            <Text size="sm" c="dimmed" ta="center" mb="md">
              Continue working on your recent projects
            </Text>
            <Button variant="light" fullWidth>
              View Projects
            </Button>
          </Card.Section>
        </Card>
      </SimpleGrid>
    </Container>
  )
}
