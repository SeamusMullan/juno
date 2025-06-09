import React, { useEffect, useState } from 'react'
import { Card, Button, Group, Text, Loader, Alert, Stack } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'

interface Project {
  id: number
  name: string
}

export default function Recents(): React.JSX.Element {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:8000/projects/recents')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch recent projects')
        return res.json()
      })
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Could not load recent projects from backend.')
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <h2>Recent Projects</h2>
      {loading && <Loader />}
      {error && (
        <Alert color="red" icon={<IconInfoCircle />} mb="md">
          {error}
        </Alert>
      )}
      {!loading && !error && projects.length === 0 && (
        <Text c="dimmed">No recent projects found.</Text>
      )}
      <Stack gap="md">
        {projects.map((project) => (
          <Card key={project.id} shadow="sm" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="center">
              <Text fw={500}>{project.name}</Text>
              <Button size="xs" variant="light">
                Open
              </Button>
            </Group>
          </Card>
        ))}
      </Stack>
    </div>
  )
}
