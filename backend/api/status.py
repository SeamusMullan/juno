from fastapi import APIRouter
import psutil
import platform
import os

router = APIRouter()

@router.get("/", summary="Status API Root", description="Root endpoint for status API.")
def data_root():
    return {"message": "Status endpoint"}

@router.get("/health", summary="Health Check", description="Returns health status of the API.")
def health_check():
    return {"status": "healthy"}

@router.get("/status", summary="API Status", description="Returns running status of the API.")
def status():
    return {"status": "running"}

@router.get("/info", summary="API Info", description="Returns API version and contact info.")
def info():
    return {
        "version": "0.0.1",
        "description": "Ampere App Backend API",
        "author": "Your Name",
        "contact": {
            "email": "your_email@example.com"
        }
    }
    
@router.get("/version", summary="API Version", description="Returns API version.")
def version():
    return {"version": "0.0.1"}

@router.get("/performance", summary="System Performance", description="Returns RAM, CPU, disk, and process usage stats.")
def performance():
    mem = psutil.virtual_memory()
    cpu = psutil.cpu_percent(interval=1)
    disk = psutil.disk_usage(os.path.abspath(os.sep))
    process = psutil.Process(os.getpid())
    return {
        "memory": {
            "total": mem.total,
            "available": mem.available,
            "percent": mem.percent,
            "used": mem.used,
            "free": mem.free
        },
        "cpu": {
            "percent": cpu
        },
        "disk": {
            "total": disk.total,
            "used": disk.used,
            "free": disk.free,
            "percent": disk.percent
        },
        "process": {
            "pid": process.pid,
            "memory_info": process.memory_info()._asdict(),
            "cpu_percent": process.cpu_percent(interval=0.1)
        },
        "system": {
            "platform": platform.system(),
            "platform_release": platform.release(),
            "platform_version": platform.version()
        }
    }