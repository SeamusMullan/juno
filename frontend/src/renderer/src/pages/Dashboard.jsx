import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  const [recentProjects, setRecentProjects] = useState([])
  const [stats, setStats] = useState({
    totalProjects: 0,
    templatesAvailable: 3,
    presetsAvailable: 0
  })

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Juno</h1>
        <p className="dashboard-subtitle">Your JUCE project generator</p>
      </div>

      <div className="dashboard-grid">
        <div className="quick-actions card">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/wizard" className="action-button primary">
              <span className="action-icon">⚡</span>
              <div>
                <h3>New Project</h3>
                <p>Create a new JUCE project</p>
              </div>
            </Link>
            <Link to="/templates" className="action-button">
              <span className="action-icon">📦</span>
              <div>
                <h3>Browse Templates</h3>
                <p>Explore available templates</p>
              </div>
            </Link>
            <Link to="/generator" className="action-button">
              <span className="action-icon">⚙️</span>
              <div>
                <h3>Advanced Setup</h3>
                <p>Full configuration form</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="stats-overview card">
          <h2>Overview</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{stats.totalProjects}</span>
              <span className="stat-label">Projects Generated</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.templatesAvailable}</span>
              <span className="stat-label">Templates Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.presetsAvailable}</span>
              <span className="stat-label">Saved Presets</span>
            </div>
          </div>
        </div>

        <div className="recent-projects card">
          <h2>Recent Projects</h2>
          {recentProjects.length > 0 ? (
            <div className="projects-list">
              {recentProjects.map((project, index) => (
                <div key={index} className="project-item">
                  <div className="project-info">
                    <h3>{project.name}</h3>
                    <p>{project.path}</p>
                    <span className="project-date">{project.createdAt}</span>
                  </div>
                  <button className="open-project-btn">Open</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No projects created yet</p>
              <Link to="/wizard" className="create-first-project">
                Create your first project
              </Link>
            </div>
          )}
        </div>

        <div className="getting-started card">
          <h2>Getting Started</h2>
          <div className="tips">
            <div className="tip">
              <span className="tip-icon">💡</span>
              <div>
                <h4>Use Templates</h4>
                <p>Start with predefined templates for faster setup</p>
              </div>
            </div>
            <div className="tip">
              <span className="tip-icon">💾</span>
              <div>
                <h4>Save Presets</h4>
                <p>Save your configurations for future projects</p>
              </div>
            </div>
            <div className="tip">
              <span className="tip-icon">🔧</span>
              <div>
                <h4>Customize Everything</h4>
                <p>All project variables are fully customizable</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
