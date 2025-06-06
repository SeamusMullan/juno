from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def data_root():
    return {"message": "Data management endpoint"}
