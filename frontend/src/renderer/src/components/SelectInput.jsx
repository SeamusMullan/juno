function SelectInput({ label, value, onChange, options, error, required = false }) {
  return (
    <div className="form-field">
      <label className="field-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <select
        className={`field-select ${error ? 'error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export default SelectInput
