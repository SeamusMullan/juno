import { AppShell } from '@mantine/core'
import { Routes, Route } from 'react-router-dom'

import Home from '../views/Home'
import CreateProject from '../views/Create_Project'
import BrowseTemplates from '../views/Browse_Templates'
import CustomProject from '../views/Custom_Project'
import Settings from '../views/Settings'

export default function Main(): React.JSX.Element {
  return (
    <AppShell.Main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/browse-templates" element={<BrowseTemplates />} />
        <Route path="/custom-project" element={<CustomProject />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AppShell.Main>
  )
}
