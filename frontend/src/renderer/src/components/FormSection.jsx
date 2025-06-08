function FormSection({ title, icon, children }) {
  return (
    <section className="form-section">
      <div className="section-header">
        <h3 className="section-title">
          <span className="section-icon">{icon}</span>
          {title}
        </h3>
      </div>
      <div className="section-content">
        {children}
      </div>
    </section>
  )
}

export default FormSection
