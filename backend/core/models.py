# Project models for FastAPI
from pydantic import BaseModel, Field, validator
from typing import List, Optional

class ProjectCreate(BaseModel):
    name: str = Field(..., min_length=1)
    product_name: str = Field(..., min_length=1)
    version: str = Field(..., min_length=1)
    company_name: str = Field(..., min_length=1)
    bundle_id: str = Field(..., min_length=1)
    manufacturer_code: str = Field(..., min_length=4, max_length=4)
    plugin_code: str = Field(..., min_length=4, max_length=4)
    plugin_type: str = Field(..., min_length=1)
    plugin_formats: List[str] = Field(...)
    output_dir: str = Field(..., min_length=1)
    git_repo: Optional[str] = None
    custom_config: Optional[str] = None

    @validator('manufacturer_code', 'plugin_code')
    def code_must_have_uppercase(cls, v):
        if not any(c.isupper() for c in v):
            raise ValueError('Code must contain at least one uppercase letter')
        if len(v) != 4:
            raise ValueError('Code must be exactly 4 characters')
        return v

    @validator('plugin_formats')
    def plugin_formats_must_not_be_empty(cls, v):
        if not v or not isinstance(v, list) or len(v) == 0:
            raise ValueError('At least one plugin format must be specified')
        return v
