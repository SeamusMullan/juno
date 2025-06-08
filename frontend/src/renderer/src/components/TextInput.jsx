function TextInput({ 
  label, 
  value, 
  onChange, 
  error, 
  placeholder, 
  required = false, 
  maxLength,
  type = 'text' 
}) {
  return (
    <div className="form-field">
      <label className="field-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        className={`field-input ${error ? 'error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export default TextInput
