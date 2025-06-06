import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    SOME_API_KEY: str = os.getenv("SOME_API_KEY", "")

settings = Settings()