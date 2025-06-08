import { useState } from 'react'
import FormSection from './FormSection'
import TextInput from './TextInput'
import SelectInput from './SelectInput'
import RadioGroup from './RadioGroup'
import DirectoryInput from './DirectoryInput'
import PresetManager from './PresetManager'
import GenerateButton from './GenerateButton'

function ProjectForm({ projectData, setProjectData, presets, setPresets }) {
  const [errors, setErrors] = useState({})
  const [isGenerating, setIsGenerating] = useState(false)

  const updateField = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const generatePluginCode = () => {
    const name = projectData.projectName.replace(/[^a-zA-Z]/g, '').substring(0, 4).toUpperCase()
    const code = name.padEnd(4, 'X')
    updateField('pluginCode', code)
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!projectData.projectName.trim()) newErrors.projectName = 'Project name is required'
    if (!projectData.productName.trim()) newErrors.productName = 'Product name is required'
    if (!projectData.version.trim()) newErrors.version = 'Version is required'
    if (!projectData.companyName.trim()) newErrors.companyName = 'Company name is required'
    if (!projectData.bundleId.trim()) newErrors.bundleId = 'Bundle ID is required'
    if (!projectData.manufacturerCode.trim()) newErrors.manufacturerCode = 'Manufacturer code is required'
    if (projectData.manufacturerCode.length !== 4) newErrors.manufacturerCode = 'Must be exactly 4 characters'
    if (!projectData.pluginCode.trim()) newErrors.pluginCode = 'Plugin code is required'
    if (projectData.pluginCode.length !== 4) newErrors.pluginCode = 'Must be exactly 4 characters'
    if (!projectData.outputDirectory.trim()) newErrors.outputDirectory = 'Output directory is required'
    
    if (projectData.templateSource === 'repository' && !projectData.repositoryUrl.trim()) {
      newErrors.repositoryUrl = 'Repository URL is required'
    }
    
    if (projectData.templateSource === 'local' && !projectData.templateDirectory.trim()) {
      newErrors.templateDirectory = 'Template directory is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGenerate = async () => {
    if (!validateForm()) return
    
    setIsGenerating(true)
    try {
      // Send project data to backend
      const response = await window.electron.ipcRenderer.invoke('generate-project', projectData)
      if (response.success) {
        alert('Project generated successfully!')
      } else {
        alert(`Error: ${response.error}`)
      }
    } catch (error) {
      alert(`Error: ${error.message}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const templateSourceOptions = [
    { value: 'predefined', label: 'Predefined Template' },
    { value: 'repository', label: 'Git Repository' },
    { value: 'local', label: 'Local Template' }
  ]

  const predefinedTemplateOptions = [
    { value: 'audio-fx', label: 'Audio FX Plugin' },
    { value: 'instrument', label: 'Instrument Plugin' },
    { value: 'industrial', label: 'Industrial Template' }
  ]

  return (
    <div className="project-form">
      <div className="form-header">
        <h2>Create New JUCE Project</h2>
        <PresetManager 
          presets={presets}
          setPresets={setPresets}
          projectData={projectData}
          setProjectData={setProjectData}
        />
      </div>

      <div className="form-content">
        <FormSection title="Project Information" icon="📋">
          <div className="form-row">
            <TextInput
              label="Project Name"
              value={projectData.projectName}
              onChange={(value) => updateField('projectName', value)}
              error={errors.projectName}
              placeholder="MyAwesomePlugin"
              required
            />
            <TextInput
              label="Product Name"
              value={projectData.productName}
              onChange={(value) => updateField('productName', value)}
              error={errors.productName}
              placeholder="My Awesome Plugin"
              required
            />
          </div>
          
          <div className="form-row">
            <TextInput
              label="Version"
              value={projectData.version}
              onChange={(value) => updateField('version', value)}
              error={errors.version}
              placeholder="1.0.0"
              required
            />
            <TextInput
              label="Company Name"
              value={projectData.companyName}
              onChange={(value) => updateField('companyName', value)}
              error={errors.companyName}
              placeholder="Your Company"
              required
            />
          </div>

          <div className="form-row">
            <TextInput
              label="Bundle ID"
              value={projectData.bundleId}
              onChange={(value) => updateField('bundleId', value)}
              error={errors.bundleId}
              placeholder="com.yourcompany.plugin"
              required
            />
            <TextInput
              label="Manufacturer Code"
              value={projectData.manufacturerCode}
              onChange={(value) => updateField('manufacturerCode', value.toUpperCase())}
              error={errors.manufacturerCode}
              placeholder="ABCD"
              maxLength={4}
              required
            />
          </div>

          <div className="form-row">
            <div className="plugin-code-container">
              <TextInput
                label="Plugin Code"
                value={projectData.pluginCode}
                onChange={(value) => updateField('pluginCode', value.toUpperCase())}
                error={errors.pluginCode}
                placeholder="PLUG"
                maxLength={4}
                required
              />
              <button
                type="button"
                className="generate-code-btn"
                onClick={generatePluginCode}
                title="Auto-generate from project name"
              >
                🎲
              </button>
            </div>
          </div>
        </FormSection>

        <FormSection title="Output Configuration" icon="📁">
          <DirectoryInput
            label="Output Directory"
            value={projectData.outputDirectory}
            onChange={(value) => updateField('outputDirectory', value)}
            error={errors.outputDirectory}
            placeholder="Select output directory..."
            required
          />
        </FormSection>

        <FormSection title="Template Configuration" icon="📄">
          <RadioGroup
            label="Template Source"
            value={projectData.templateSource}
            onChange={(value) => updateField('templateSource', value)}
            options={templateSourceOptions}
          />

          {projectData.templateSource === 'predefined' && (
            <SelectInput
              label="Predefined Template"
              value={projectData.predefinedTemplate}
              onChange={(value) => updateField('predefinedTemplate', value)}
              options={predefinedTemplateOptions}
            />
          )}

          {projectData.templateSource === 'repository' && (
            <>
              <TextInput
                label="Repository URL"
                value={projectData.repositoryUrl}
                onChange={(value) => updateField('repositoryUrl', value)}
                error={errors.repositoryUrl}
                placeholder="https://github.com/user/template.git"
                required
              />
              <TextInput
                label="Branch"
                value={projectData.branch}
                onChange={(value) => updateField('branch', value)}
                placeholder="main"
              />
            </>
          )}

          {projectData.templateSource === 'local' && (
            <DirectoryInput
              label="Template Directory"
              value={projectData.templateDirectory}
              onChange={(value) => updateField('templateDirectory', value)}
              error={errors.templateDirectory}
              placeholder="Select template directory..."
              required
            />
          )}
        </FormSection>
      </div>

      <div className="form-footer">
        <GenerateButton 
          onClick={handleGenerate}
          disabled={isGenerating}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  )
}

export default ProjectForm
