import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const WIZARD_STEPS = [
  {
    id: 'template',
    title: 'Choose Template',
    description: 'Select your project template'
  },
  {
    id: 'project',
    title: 'Project Details',
    description: 'Configure your project information'
  },
  {
    id: 'plugin',
    title: 'Plugin Configuration',
    description: 'Set up plugin-specific settings'
  },
  {
    id: 'output',
    title: 'Output & Generation',
    description: 'Choose output location and generate'
  }
]

function ProjectWizard() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [projectData, setProjectData] = useState({
    projectName: '',
    productName: '',
    version: '1.0.0',
    companyName: '',
    bundleId: '',
    manufacturerCode: '',
    pluginCode: '',
    outputDirectory: '',
    templateSource: 'predefined',
    repositoryUrl: '',
    branch: 'main',
    templateDirectory: '',
    predefinedTemplate: 'audio-fx'
  })

  const nextStep = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const renderStepContent = () => {
    switch (WIZARD_STEPS[currentStep].id) {
      case 'template':
        return <TemplateStep projectData={projectData} onChange={handleInputChange} />
      case 'project':
        return <ProjectStep projectData={projectData} onChange={handleInputChange} />
      case 'plugin':
        return <PluginStep projectData={projectData} onChange={handleInputChange} />
      case 'output':
        return <OutputStep projectData={projectData} onChange={handleInputChange} />
      default:
        return null
    }
  }

  return (
    <div className="project-wizard">
      <div className="wizard-header">
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          ← Back to Dashboard
        </button>
        <h1>Project Creation Wizard</h1>
      </div>

      <div className="wizard-progress">
        {WIZARD_STEPS.map((step, index) => (
          <div 
            key={step.id}
            className={`progress-step ${index <= currentStep ? 'active' : ''} ${index === currentStep ? 'current' : ''}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-info">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="wizard-content">
        <div className="step-header">
          <h2>{WIZARD_STEPS[currentStep].title}</h2>
          <p>{WIZARD_STEPS[currentStep].description}</p>
        </div>

        <div className="step-content">
          {renderStepContent()}
        </div>

        <div className="wizard-actions">
          <button 
            className="wizard-button secondary"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          
          {currentStep === WIZARD_STEPS.length - 1 ? (
            <button className="wizard-button primary">
              Generate Project
            </button>
          ) : (
            <button 
              className="wizard-button primary"
              onClick={nextStep}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Step Components
function TemplateStep({ projectData, onChange }) {
  return (
    <div className="template-step">
      <div className="template-source-selection">
        <h3>Template Source</h3>
        <div className="radio-group">
          <label className="radio-option">
            <input 
              type="radio"
              className="radio-input"
              name="templateSource" 
              value="predefined"
              checked={projectData.templateSource === 'predefined'}
              onChange={(e) => onChange('templateSource', e.target.value)}
            />
            <span className="radio-label">Predefined Templates</span>
          </label>
          <label className="radio-option">
            <input 
              type="radio"
              className="radio-input"
              name="templateSource" 
              value="repository"
              checked={projectData.templateSource === 'repository'}
              onChange={(e) => onChange('templateSource', e.target.value)}
            />
            <span className="radio-label">Git Repository</span>
          </label>
          <label className="radio-option">
            <input 
              type="radio"
              className="radio-input"
              name="templateSource" 
              value="local"
              checked={projectData.templateSource === 'local'}
              onChange={(e) => onChange('templateSource', e.target.value)}
            />
            <span className="radio-label">Local Template</span>
          </label>
        </div>
      </div>

      {projectData.templateSource === 'predefined' && (
        <div className="predefined-templates">
          <h3>Choose Template</h3>
          <div className="template-grid">
            <div className={`template-card ${projectData.predefinedTemplate === 'audio-fx' ? 'selected' : ''}`}
                 onClick={() => onChange('predefinedTemplate', 'audio-fx')}>
              <h4>Audio FX Plugin</h4>
              <p>Basic audio effect processor template</p>
            </div>
            <div className={`template-card ${projectData.predefinedTemplate === 'instrument' ? 'selected' : ''}`}
                 onClick={() => onChange('predefinedTemplate', 'instrument')}>
              <h4>Instrument Plugin</h4>
              <p>Synthesizer and instrument template</p>
            </div>
            <div className={`template-card ${projectData.predefinedTemplate === 'industrial' ? 'selected' : ''}`}
                 onClick={() => onChange('predefinedTemplate', 'industrial')}>
              <h4>Industrial Template</h4>
              <p>Professional-grade template with advanced features</p>
            </div>
          </div>
        </div>
      )}

      {projectData.templateSource === 'repository' && (
        <div className="repository-config">
          <div className="form-field">
            <label className="field-label">Repository URL</label>
            <input 
              type="text"
              className="field-input"
              value={projectData.repositoryUrl}
              onChange={(e) => onChange('repositoryUrl', e.target.value)}
              placeholder="https://github.com/user/template.git"
            />
          </div>
          <div className="form-field">
            <label className="field-label">Branch</label>
            <input 
              type="text"
              className="field-input"
              value={projectData.branch}
              onChange={(e) => onChange('branch', e.target.value)}
              placeholder="main"
            />
          </div>
        </div>
      )}

      {projectData.templateSource === 'local' && (
        <div className="local-template">
          <div className="form-field">
            <label className="field-label">Template Directory</label>
            <div className="directory-input">
              <input 
                type="text"
                className="field-input"
                value={projectData.templateDirectory}
                onChange={(e) => onChange('templateDirectory', e.target.value)}
                placeholder="/path/to/template"
              />
              <button className="browse-button">Browse</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ProjectStep({ projectData, onChange }) {
  return (
    <div className="project-step">      <div className="form-row">
        <div className="form-field">
          <label className="field-label">Project Name</label>
          <input 
            type="text"
            className="field-input"
            value={projectData.projectName}
            onChange={(e) => onChange('projectName', e.target.value)}
            placeholder="MyAwesomePlugin"
          />
        </div>
        <div className="form-field">
          <label className="field-label">Product Name</label>
          <input 
            type="text"
            className="field-input"
            value={projectData.productName}
            onChange={(e) => onChange('productName', e.target.value)}
            placeholder="My Awesome Plugin"
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-field">
          <label className="field-label">Version</label>
          <input 
            type="text"
            className="field-input"
            value={projectData.version}
            onChange={(e) => onChange('version', e.target.value)}
            placeholder="1.0.0"
          />
        </div>
        <div className="form-field">
          <label className="field-label">Company Name</label>
          <input 
            type="text"
            className="field-input"
            value={projectData.companyName}
            onChange={(e) => onChange('companyName', e.target.value)}
            placeholder="My Company"
          />
        </div>
      </div>
      
      <div className="form-field">
        <label className="field-label">Bundle ID</label>
        <input 
          type="text"
          className="field-input"
          value={projectData.bundleId}
          onChange={(e) => onChange('bundleId', e.target.value)}
          placeholder="com.mycompany.myawesomeplugin"
        />
      </div>
    </div>
  )
}

function PluginStep({ projectData, onChange }) {
  const generatePluginCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    onChange('pluginCode', result)
  }

  return (
    <div className="plugin-step">      <div className="form-row">
        <div className="form-field">
          <label className="field-label">Manufacturer Code</label>
          <input
            type="text"
            className="field-input"
            value={projectData.manufacturerCode}
            onChange={(e) => onChange('manufacturerCode', e.target.value)}
            placeholder="ABCD"
            maxLength="4"
          />
        </div>
        <div className="form-field">
          <label className="field-label">Plugin Code</label>
          <div className="plugin-code-container">
            <input
              type="text"
              className="field-input"
              value={projectData.pluginCode}
              onChange={(e) => onChange('pluginCode', e.target.value)}
              placeholder="EFGH"
              maxLength="4"
            />
            <button 
              type="button" 
              className="generate-code-btn"
              onClick={generatePluginCode}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function OutputStep({ projectData, onChange }) {
  return (
    <div className="output-step">      <div className="form-field">
        <label className="field-label">Output Directory</label>
        <div className="directory-input">
          <input
            type="text"
            className="field-input"
            value={projectData.outputDirectory}
            onChange={(e) => onChange('outputDirectory', e.target.value)}
            placeholder="/path/to/output"
          />
          <button className="browse-button">Browse</button>
        </div>
      </div>

      <div className="project-preview">
        <h3>Project Preview</h3>
        <div className="preview-card">
          <h4>{projectData.projectName || 'Untitled Project'}</h4>
          <p><strong>Product:</strong> {projectData.productName || 'N/A'}</p>
          <p><strong>Version:</strong> {projectData.version}</p>
          <p><strong>Company:</strong> {projectData.companyName || 'N/A'}</p>
          <p><strong>Bundle ID:</strong> {projectData.bundleId || 'N/A'}</p>
          <p><strong>Template:</strong> {projectData.predefinedTemplate || projectData.templateSource}</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectWizard
