import { useState } from 'react'
import ProjectForm from '../components/ProjectForm'
import Header from '../components/Header'

function ProjectGenerator() {
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

  const [presets, setPresets] = useState([])

  return (
    <div className="project-generator">
      <div className="generator-content">
        <ProjectForm
          projectData={projectData}
          setProjectData={setProjectData}
          presets={presets}
          setPresets={setPresets}
        />
      </div>
    </div>
  )
}

export default ProjectGenerator
