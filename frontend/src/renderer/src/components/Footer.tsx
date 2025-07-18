import { AppShell, Group, Text, Anchor } from '@mantine/core'
import PropTypes from 'prop-types'

Footer.propTypes = {
  isBackendOnline: PropTypes.boolean
}

export default function Footer(isBackendOnline): React.JSX.Element {
  console.log(isBackendOnline)
  console.log('Footer rendered with backend status:', isBackendOnline)
  return (
    <AppShell.Footer p="md">
      <Group justify="space-between" align="center">
        <Text size="sm" color="dimmed">
          Backend Status:{' '}
          {isBackendOnline ? (
            <Text component="span" color="green">
              Online
            </Text>
          ) : (
            <Text component="span" color="red">
              Offline
            </Text>
          )}
        </Text>
        <Text size="sm" color="dimmed">
          Juno by Seamus Mullan - 2025 - See GitHub for License
        </Text>
        <Anchor
          href="https://github.com/seamusmullan/juno"
          target="_blank"
          size="sm"
          color="dimmed"
        >
          GitHub Repository
        </Anchor>
      </Group>
    </AppShell.Footer>
  )
}

// create style for footer
