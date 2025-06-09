function RadioGroup({ label, value, onChange, options, error, required = false }) {
  return (
    <div className="form-field">
      <label className="field-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <div className="radio-group">
        {options.map((option) => (
          <label key={option.value} className="radio-option">
            <input
              type="radio"
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="radio-input"
            />
            <span className="radio-label">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export default RadioGroup
