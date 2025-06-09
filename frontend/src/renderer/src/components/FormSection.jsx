function FormSection({ title, icon, children }) {
  return (
    <section className="form-section">
      <h3>
        <span className="form-section-icon">{icon}</span>
        {title}
      </h3>
      <div className="section-content">
        {children}
      </div>
    </section>
  )
}

export default FormSection
