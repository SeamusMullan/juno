import { NavLink, useLocation } from 'react-router-dom'

function Navigation() {
  const location = useLocation()

  const navItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: '🏠'
    },
    {
      path: '/wizard',
      label: 'Project Wizard',
      icon: '⚡'
    },
    {
      path: '/generator',
      label: 'Advanced Generator',
      icon: '⚙️'
    },
    {
      path: '/templates',
      label: 'Template Library',
      icon: '📦'
    }
  ]

  return (
    <nav className="main-navigation">
      <div className="nav-items">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
