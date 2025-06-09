# Templates API endpoints for FastAPI
from fastapi import APIRouter, HTTPException

router = APIRouter()

# Placeholder json data
templates = [
    {"id": 1, "name": "Starter App", "description": "A basic starter template."},
    {"id": 2, "name": "Dashboard", "description": "A dashboard template."},
]

@router.get("/", summary="List Templates", description="Retrieve a list of available project templates.")
def list_templates():
    return templates

@router.get("/{template_id}", summary="Get Template Details", description="Retrieve details for a specific template.")
def get_template(template_id: int):
    for t in templates:
        if t["id"] == template_id:
            return t
    raise HTTPException(status_code=404, detail="Template not found")
