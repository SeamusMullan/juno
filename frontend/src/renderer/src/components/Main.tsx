import { AppShell, Container, Title, Text, Paper, SimpleGrid, Card } from '@mantine/core'

export default function Main(): React.JSX.Element {
  return (
    <AppShell.Main>
      <Container fluid p="md">
        <Title order={2} mb="md">
          Welcome to Juno
        </Title>

        <SimpleGrid cols={2} spacing="md" mb="xl">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} mb="sm">
              Card 1
            </Title>
            <Text size="sm" c="dimmed">
              This is a sample card component. You can replace this content with your actual
              application content.
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} mb="sm">
              Card 2
            </Title>
            <Text size="sm" c="dimmed">
              Another sample card to demonstrate the layout structure of your main content area.
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} mb="sm">
              Card 3
            </Title>
            <Text size="sm" c="dimmed">
              You can customize these cards based on your application&apos;s specific requirements.
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} mb="sm">
              Card 4
            </Title>
            <Text size="sm" c="dimmed">
              The main content area is flexible and can accommodate various types of content.
            </Text>
          </Card>
        </SimpleGrid>

        <Paper p="md" withBorder>
          <Title order={3} mb="sm">
            Main Content Area
          </Title>
          <Text>
            This is the main content area of your application. You can add any content here such as
            data tables, charts, forms, or any other components your application needs.
          </Text>
        </Paper>
      </Container>
    </AppShell.Main>
  )
}
