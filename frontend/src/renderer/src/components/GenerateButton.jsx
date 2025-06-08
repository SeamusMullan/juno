function GenerateButton({ onClick, disabled, isGenerating }) {
  return (
    <button
      className={`generate-button ${disabled ? 'disabled' : ''} ${isGenerating ? 'generating' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isGenerating ? (
        <>
          <span className="spinner"></span>
          Generating Project...
        </>
      ) : (
        <>
          🚀 Generate JUCE Project
        </>
      )}
    </button>
  )
}

export default GenerateButton
