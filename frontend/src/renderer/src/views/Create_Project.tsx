import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  TextInput,
  Select,
  Group,
  MultiSelect,
  Divider,
  Tooltip,
  ActionIcon,
  Alert
} from '@mantine/core'
import { IconRocket, IconFolder, IconRefresh, IconInfoCircle } from '@tabler/icons-react'
import { useState } from 'react'

import genPluginCode from '../functions/genPluginCode'

export default function CreateProject(): React.JSX.Element {
  // State for all JUCE project variables
  const [projectName, setProjectName] = useState('')
  const [productName, setProductName] = useState('')
  const [version, setVersion] = useState('1.0.0')
  const [companyName, setCompanyName] = useState('')
  const [bundleId, setBundleId] = useState('')
  const [manufacturerCode, setManufacturerCode] = useState('')
  const [pluginCode, setPluginCode] = useState('')
  const [pluginType, setPluginType] = useState('audio')
  const [pluginFormats, setPluginFormats] = useState<string[]>([])
  const [outputDir, setOutputDir] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  // Auto-generate plugin code (4 uppercase letters from project name)
  const autoGeneratePluginCode = (): string => {
    if (!projectName) return ''
    return genPluginCode()
  }

  // Handler for output directory selection (placeholder for Electron dialog)
  const handleSelectOutputDir = async (): Promise<void> => {
    // If using Electron preload, replace with: window.electron?.showOpenDialog({ properties: ['openDirectory'] })
    // For now, just prompt
    const dir = prompt('Enter output directory path:')
    if (dir) setOutputDir(dir)
  }

  // Handler for auto-generating plugin code
  const handleAutoGenPluginCode = (): void => {
    setPluginCode(autoGeneratePluginCode())
  }

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    // Basic validation
    if (
      !projectName ||
      !productName ||
      !version ||
      !companyName ||
      !bundleId ||
      !manufacturerCode ||
      !pluginCode ||
      !outputDir
    ) {
      setError('Please fill in all required fields.')
      return
    }
    if (pluginCode.length !== 4) {
      setError('Plugin Code must be 4 characters.')
      return
    }
    if (manufacturerCode.length !== 4) {
      setError('Manufacturer Code must be 4 characters.')
      return
    }
    if (pluginFormats.length === 0) {
      setError('Select at least one plugin format.')
      return
    }
    // TODO: Call backend API to generate project
    setSuccess('Project generation started! (API call not implemented)')
  }

  return (
    <Container fluid py="xl">
      <Title order={1} mb="xl" ta="center">
        JUCE Project Generator
      </Title>

      <Text size="lg" c="dimmed" ta="center" mb="xl">
        Fill in the details below to generate a cross-platform JUCE project
      </Text>

      <form onSubmit={handleSubmit}>
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
          <TextInput
            label="Project Name"
            placeholder="Enter your project name"
            size="lg"
            required
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <TextInput
            label="Product Name"
            placeholder="Commercial product name"
            size="lg"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextInput
            label="Version"
            placeholder="1.0.0"
            size="lg"
            required
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          />
          <TextInput
            label="Company Name"
            placeholder="Developer or company name"
            size="lg"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <TextInput
            label="Bundle ID"
            placeholder="com.company.product"
            size="lg"
            required
            value={bundleId}
            onChange={(e) => setBundleId(e.target.value)}
          />
          <Group gap="sm" align="end">
            <TextInput
              label="Manufacturer Code"
              placeholder="4-letter code"
              size="lg"
              required
              value={manufacturerCode}
              maxLength={4}
              onChange={(e) => setManufacturerCode(e.target.value.toUpperCase())}
            />
            <TextInput
              label="Plugin Code"
              placeholder="4-letter code"
              size="lg"
              required
              value={pluginCode}
              maxLength={4}
              onChange={(e) => setPluginCode(e.target.value.toUpperCase())}
            />
            <Tooltip label="Auto-generate from project name">
              <ActionIcon
                variant="light"
                onClick={handleAutoGenPluginCode}
                mt={24}
                aria-label="Auto-generate Plugin Code"
              >
                <IconRefresh size={20} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Select
            label="Plugin Type"
            placeholder="Select plugin type"
            size="lg"
            data={[
              { value: 'audio', label: 'Audio FX Plugin' },
              { value: 'instrument', label: 'Instrument Plugin' }
            ]}
            value={pluginType}
            onChange={(value) => setPluginType(value || '')}
            required
          />
          <MultiSelect
            label="Plugin Formats"
            placeholder="Select plugin formats"
            size="lg"
            data={[
              { value: 'vst3', label: 'VST3' },
              { value: 'au', label: 'AudioUnit (AU)' },
              { value: 'aax', label: 'AAX' }
            ]}
            value={pluginFormats}
            onChange={setPluginFormats}
            required
          />
          <Group gap="sm" align="end">
            <TextInput
              label="Output Directory"
              placeholder="Select output folder"
              size="lg"
              required
              value={outputDir}
              readOnly
            />
            <Tooltip label="Browse for output directory">
              <ActionIcon
                variant="light"
                onClick={handleSelectOutputDir}
                mt={24}
                aria-label="Select Output Directory"
              >
                <IconFolder size={20} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Divider />
          <Group justify="center" mt="xl">
            <Button size="lg" leftSection={<IconRocket size={20} />} type="submit">
              Generate JUCE Project
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  )
}
