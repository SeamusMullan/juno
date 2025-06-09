function DirectoryInput({ label, value, onChange, error, placeholder, required = false }) {
  const handleBrowse = async () => {
    try {
      const result = await window.electron.ipcRenderer.invoke('select-directory')
      if (result && !result.canceled && result.filePaths.length > 0) {
        onChange(result.filePaths[0])
      }
    } catch (error) {
      console.error('Error selecting directory:', error)
    }
  }

  return (
    <div className="form-field">
      <label className="field-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <div className="directory-input">
        <input
          type="text"
          className={`field-input ${error ? 'error' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly
        />
        <button type="button" className="browse-button" onClick={handleBrowse}>
          📁 Browse
        </button>
      </div>
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export default DirectoryInput
