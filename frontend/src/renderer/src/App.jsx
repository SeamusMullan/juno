import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import ProjectWizard from './pages/ProjectWizard'
import ProjectGenerator from './pages/ProjectGenerator'
import TemplateLibrary from './pages/TemplateLibrary'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-body">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/wizard" element={<ProjectWizard />} />
              <Route path="/generator" element={<ProjectGenerator />} />
              <Route path="/templates" element={<TemplateLibrary />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
