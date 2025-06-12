# Projects API endpoints for FastAPI

from fastapi import APIRouter, HTTPException
from typing import List
from core.models import ProjectCreate
from services.data_service import generate_project

router = APIRouter()

# Placeholder json data
projects = [
    {"id": 1, "name": "Project One", "recent": True},
    {"id": 2, "name": "Project Two", "recent": False},
]

@router.get("/", summary="List Projects", description="Retrieve a list of all projects.")
def list_projects():
    return projects

@router.post("/", summary="Create Project", description="Create a new project.")
def create_project(project: ProjectCreate):
    result = generate_project(project)
    return result

@router.get("/recents", summary="Recent Projects", description="Retrieve a list of recent projects.")
def recent_projects():
    return [p for p in projects if p.get("recent")]

@router.get("/{project_id}", summary="Get Project Details", description="Retrieve details for a specific project.")
def get_project(project_id: int):
    for p in projects:
        if p["id"] == project_id:
            return p
    raise HTTPException(status_code=404, detail="Project not found")

@router.put("/{project_id}", summary="Update Project", description="Update an existing project.")
def update_project(project_id: int, project: dict):
    for idx, p in enumerate(projects):
        if p["id"] == project_id:
            projects[idx].update(project)
            return projects[idx]
    raise HTTPException(status_code=404, detail="Project not found")

@router.delete("/{project_id}", summary="Delete Project", description="Delete a project.")
def delete_project(project_id: int):
    for idx, p in enumerate(projects):
        if p["id"] == project_id:
            return projects.pop(idx)
    raise HTTPException(status_code=404, detail="Project not found")
