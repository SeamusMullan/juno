import { Container, Title, Text, SimpleGrid, Card, Badge, Button, Group } from '@mantine/core'
import { IconTemplate, IconDownload, IconStar } from '@tabler/icons-react'

const templates = [
  {
    id: 1,
    name: 'React Dashboard',
    description: 'Modern admin dashboard with React, TypeScript, and Material UI',
    tags: ['React', 'TypeScript', 'Dashboard'],
    downloads: 1234,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Next.js Blog',
    description: 'Full-featured blog with Next.js, MDX, and Tailwind CSS',
    tags: ['Next.js', 'Blog', 'MDX'],
    downloads: 856,
    rating: 4.6
  },
  {
    id: 3,
    name: 'Express API',
    description: 'RESTful API starter with Express, TypeScript, and MongoDB',
    tags: ['Express', 'API', 'MongoDB'],
    downloads: 2341,
    rating: 4.9
  },
  {
    id: 4,
    name: 'Vue E-commerce',
    description: 'Complete e-commerce solution with Vue.js and Vuetify',
    tags: ['Vue.js', 'E-commerce', 'Vuetify'],
    downloads: 567,
    rating: 4.5
  }
]

export default function BrowseTemplates(): React.JSX.Element {
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl" ta="center">
        Browse Templates
      </Title>

      <Text size="lg" c="dimmed" ta="center" mb="xl">
        Choose from our collection of pre-built project templates
      </Text>

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

                <Button size="sm" variant="light">
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
