import { AppShell, Group, Text, Anchor } from '@mantine/core'
import PropTypes from 'prop-types'

Footer.propTypes = {
  isBackendOnline: PropTypes.boolean
}

export default function Footer(isBackendOnline): React.JSX.Element {
  console.log(isBackendOnline)
  return (
    <AppShell.Footer p="md">
      {/*
      Contents of footer
      - Indicator for backend status (online/offline) (left aligned)
      - Link to GitHub repository (right aligned)
      - Rights information (centered)
      */}
      <Group justify="space-between" align="center">
        <Text size="sm" color="dimmed">
          Backend Status:{' '}
          {!isBackendOnline ? (
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
          © 2025 Juno. See GitHub for License
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
