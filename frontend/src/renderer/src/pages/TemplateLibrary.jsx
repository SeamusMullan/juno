import { useState } from 'react'
import { Link } from 'react-router-dom'

const PREDEFINED_TEMPLATES = [
  {
    id: 'audio-fx',
    name: 'Audio FX Plugin',
    description: 'A basic audio effect processor template with common DSP processing capabilities',
    features: ['Audio processing', 'Parameter controls', 'Preset management', 'VST3/AU support'],
    type: 'Audio Effect',
    complexity: 'Beginner',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'instrument',
    name: 'Instrument Plugin',
    description: 'Complete synthesizer and instrument template with MIDI support',
    features: ['MIDI input', 'Voice management', 'Sound synthesis', 'Polyphonic support'],
    type: 'Instrument',
    complexity: 'Intermediate',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'industrial',
    name: 'Industrial Template',
    description: 'Professional-grade template with advanced DSP processing and industrial-strength features',
    features: ['Advanced DSP', 'Professional UI', 'Performance optimized', 'Multi-format support'],
    type: 'Professional',
    complexity: 'Advanced',
    lastUpdated: '2025-01-01'
  }
]

function TemplateLibrary() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredTemplates = PREDEFINED_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || template.type.toLowerCase() === filterType.toLowerCase()
    return matchesSearch && matchesFilter
  })

  return (
    <div className="template-library">
      <div className="library-header">
        <div className="header-content">
          <h1>Template Library</h1>
          <p>Browse and select from available project templates</p>
        </div>
        <Link to="/" className="back-button">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="library-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <label>Filter by type:</label>
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="audio effect">Audio Effects</option>
            <option value="instrument">Instruments</option>
            <option value="professional">Professional</option>
          </select>
        </div>
      </div>

      <div className="templates-container">
        <div className="templates-grid">
          {filteredTemplates.map(template => (
            <div 
              key={template.id}
              className={`template-card ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
              onClick={() => setSelectedTemplate(template)}
            >
              <div className="template-header">
                <h3>{template.name}</h3>
                <span className={`complexity-badge ${template.complexity.toLowerCase()}`}>
                  {template.complexity}
                </span>
              </div>
              
              <p className="template-description">{template.description}</p>
              
              <div className="template-meta">
                <span className="template-type">{template.type}</span>
                <span className="template-updated">Updated: {template.lastUpdated}</span>
              </div>

              <div className="template-features">
                {template.features.map(feature => (
                  <span key={feature} className="feature-tag">{feature}</span>
                ))}
              </div>

              <div className="template-actions">
                <Link 
                  to="/wizard" 
                  state={{ selectedTemplate: template }}
                  className="use-template-btn"
                >
                  Use Template
                </Link>
                <button className="preview-btn">Preview</button>
              </div>
            </div>
          ))}
        </div>

        {selectedTemplate && (
          <div className="template-details">
            <div className="details-header">
              <h2>{selectedTemplate.name}</h2>
              <button 
                className="close-details"
                onClick={() => setSelectedTemplate(null)}
              >
                ×
              </button>
            </div>

            <div className="details-content">
              <div className="detail-section">
                <h3>Description</h3>
                <p>{selectedTemplate.description}</p>
              </div>

              <div className="detail-section">
                <h3>Features</h3>
                <ul className="features-list">
                  {selectedTemplate.features.map(feature => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h3>Template Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Type:</span>
                    <span className="info-value">{selectedTemplate.type}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Complexity:</span>
                    <span className="info-value">{selectedTemplate.complexity}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Updated:</span>
                    <span className="info-value">{selectedTemplate.lastUpdated}</span>
                  </div>
                </div>
              </div>

              <div className="detail-actions">
                <Link 
                  to="/wizard" 
                  state={{ selectedTemplate }}
                  className="primary-action-btn"
                >
                  Start with this Template
                </Link>
                <Link 
                  to="/generator" 
                  state={{ selectedTemplate }}
                  className="secondary-action-btn"
                >
                  Advanced Configuration
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="empty-state">
          <h3>No templates found</h3>
          <p>Try adjusting your search terms or filters</p>
        </div>
      )}

      <div className="library-footer">
        <div className="add-template-section">
          <h3>Need a custom template?</h3>
          <p>You can also use Git repositories or local template directories</p>
          <Link to="/wizard" className="add-template-btn">
            Add Custom Template
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TemplateLibrary
