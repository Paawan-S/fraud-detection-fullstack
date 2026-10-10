# fraud-detection-fullstack
## Running with Docker

This project runs as three containerized services (ML microservice, Java backend,
React frontend), orchestrated with Docker Compose.

**Prerequisites:** Docker Desktop installed and running.

**To run everything:**
docker compose up --build

**Once running:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- ML service: http://localhost:8000

**To stop:**

docker compose down
Transaction history persists across restarts via a named Docker volume.
