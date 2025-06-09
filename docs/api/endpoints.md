# Juno API Endpoints

This document outlines the required FastAPI backend endpoints to support the current frontend functionality as implemented in the Home view and related navigation.

## Project Management

### Create Project

- **POST** `/projects/`
  - Create a new project with user-provided details.

### List Projects

- **GET** `/projects/`
  - Retrieve a list of all projects.

### Get Project Details

- **GET** `/projects/{project_id}`
  - Retrieve details for a specific project.

### Recent Projects

- **GET** `/projects/recents`
  - Retrieve a list of recently accessed projects.

## Templates

### List Templates

- **GET** `/templates/`
  - Retrieve a list of available project templates.

### Get Template Details

- **GET** `/templates/{template_id}`
  - Retrieve details for a specific template.

## Additional (Optional)

### Update Project

- **PUT** `/projects/{project_id}`
  - Update an existing project.

### Delete Project

- **DELETE** `/projects/{project_id}`
  - Delete a project.

---

These endpoints ensure the frontend can:

- Create new projects
- Browse and select templates
- View and continue recent projects
- List and manage all projects

Refer to the FastAPI implementation for request/response schemas and authentication requirements.
