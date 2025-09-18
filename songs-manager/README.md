# Song List Manager

## Overview

Song List Manager is a full-stack web application designed to manage song lists. The system reads CSV files containing song data, converts all text to lowercase for consistency, and displays the songs in a sortable table organized by band name.

---

## System Requirements

- Node.js 18 or later
- Docker Desktop (for containerized deployment)
- Visual Studio Code (recommended for development)
- Git (version control)

---

## Quick Start Installation

```bash
# Open terminal and run:
npm run setup
npm run dev
```

---

## Application URLs

- Frontend app: [http://localhost:3001](http://localhost:3001)
- Backend API: [http://localhost:3000](http://localhost:3000)
- PostgreSQL Database: localhost:5432

---

## Docker Commands

```bash
docker-compose up -d           # Start all containers in detached mode
docker-compose down            # Stop containers
docker-compose logs -f         # Follow logs for all containers
```

---

## Features

- ✅ CSV file upload with automatic conversion to lowercase text
- ✅ Dynamic sortable table displaying songs, sorted by band name by default
- ✅ Robust error handling throughout backend and frontend
- ✅ Responsive design for desktop and mobile devices
- ✅ Fully Dockerized setup for both development and production environments

---

## Additional Information

- The backend is built using NestJS with TypeScript and connects to a PostgreSQL database.
- The frontend is built with React, TypeScript, and uses TanStack Table for powerful table functionalities.
- The system supports CSV files where fields are separated by semicolons (;), matching the provided song list format.
- Docker Compose orchestrates the database, backend, and frontend services for easy startup and shutdown.

---

## Development Workflow

- Code formatting and linting are enforced for code quality.
- Automated tests ensure reliability (run via `npm test`).
- Environment variables are configured via `.env` files for security and flexibility.

---

## Contribution

Feel free to fork the project and submit pull requests for improvements or bug fixes. Issues and feature requests are welcome.

---

## Contact

For any questions or support, please contact the maintainer.
