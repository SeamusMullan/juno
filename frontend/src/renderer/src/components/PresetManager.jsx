import { useState } from 'react'

function PresetManager({ presets, setPresets, projectData, setProjectData }) {
  const [showPresets, setShowPresets] = useState(false)
  const [presetName, setPresetName] = useState('')

  const savePreset = async () => {
    if (!presetName.trim()) {
      alert('Please enter a preset name')
      return
    }

    const newPreset = {
      id: Date.now(),
      name: presetName,
      data: { ...projectData },
      createdAt: new Date().toISOString()
    }

    try {
      const result = await window.electron.ipcRenderer.invoke('save-preset', newPreset)
      if (result.success) {
        setPresets(prev => [...prev, newPreset])
        setPresetName('')
        alert('Preset saved successfully!')
      } else {
        alert(`Error saving preset: ${result.error}`)
      }
    } catch (error) {
      console.error('Error saving preset:', error)
      alert(`Error saving preset: ${error.message}`)
    }
  }

  const loadPreset = async (preset) => {
    setProjectData(preset.data)
    setShowPresets(false)
    alert(`Preset "${preset.name}" loaded successfully!`)
  }

  const deletePreset = async (presetId) => {
    if (confirm('Are you sure you want to delete this preset?')) {
      try {
        const result = await window.electron.ipcRenderer.invoke('delete-preset', presetId)
        if (result.success) {
          setPresets(prev => prev.filter(p => p.id !== presetId))
        } else {
          alert(`Error deleting preset: ${result.error}`)
        }
      } catch (error) {
        console.error('Error deleting preset:', error)
        alert(`Error deleting preset: ${error.message}`)
      }
    }
  }

  return (
    <div className="preset-manager">
      <div className="preset-actions">
        <button
          className="preset-button"
          onClick={() => setShowPresets(!showPresets)}
        >
          📄 Presets
        </button>
        
        <div className="save-preset">
          <input
            type="text"
            placeholder="Preset name..."
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            className="preset-name-input"
            onKeyPress={(e) => e.key === 'Enter' && savePreset()}
          />
          <button
            className="save-button"
            onClick={savePreset}
            disabled={!presetName.trim()}
          >
            💾 Save
          </button>
        </div>
      </div>

      {showPresets && (
        <div className="preset-dropdown">
          <div className="preset-list">
            {presets.length === 0 ? (
              <div className="no-presets">No presets saved yet</div>
            ) : (
              presets.map(preset => (
                <div key={preset.id} className="preset-item">
                  <div className="preset-info">
                    <span className="preset-name">{preset.name}</span>
                    <span className="preset-date">
                      {new Date(preset.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="preset-actions">
                    <button
                      className="load-button"
                      onClick={() => loadPreset(preset)}
                    >
                      Load
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => deletePreset(preset.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PresetManager
