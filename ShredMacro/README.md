🥗 Shred-Macros
===============

**AI-Powered Recipe & Nutrition Assistant (Dockerized Full-Stack App)**

Shred-Macros is a **production-style, Dockerized full-stack application** that demonstrates **real-world system design**, **cross-service communication**, and **LLM integration**.\
The system is built using **React, Node.js, FastAPI, LangChain, and MongoDB**, and runs as **multiple isolated services using Docker Compose**.

This project focuses on **how modern applications are architected and orchestrated using containers**, not just on feature implementation.

* * * * *

🚀 Key Capabilities
-------------------

-   **AI Recipe Generation**

    -   Veg / non-veg selection

    -   Ingredients + cooking time

    -   Context-aware follow-ups (chat memory)

-   **LLM Intelligence**

    -   Ingredient substitution handling

    -   Optional macro & micro nutrition output

    -   Structured JSON responses from the AI

-   **Chat-like Experience**

    -   Conversation history preserved

    -   Incremental refinement of recipes

-   **Recipe Sharing**

    -   Persist full recipes (title, ingredients, steps, macros, image)

    -   Stored in MongoDB

* * * * *

🧠 System Architecture (Important)
----------------------------------

`Client (React) -->  HTTP (REST) --> Backend API (Node.js / Express) --> HTTP (internal service call) ---> AI Service (FastAPI + LangChain + LLM) ---> MongoDB`

Each component runs as an **independent Docker container**, enabling:

-   clear service boundaries

-   easier debugging and isolation

-   production-style local development

* * * * *

🐳 Dockerized Services
----------------------

The entire application is orchestrated using **Docker Compose**.

### Services Overview

-   **frontend**

    -   React (Vite)

    -   Runs in its own container

    -   Exposed on `5173`

-   **backend**

    -   Node.js + Express

    -   Acts as API gateway

    -   Handles authentication, recipe CRUD, and DB access

    -   Exposed on `5001`

-   **ai-service**

    -   Python FastAPI + LangChain

    -   Handles all LLM-related logic

    -   Stateless AI microservice

    -   Exposed on `8000`

-   **mongo**

    -   MongoDB database

    -   Accessible only within Docker network

-   **mongo-express** (development utility)

    -   Database UI for inspection

    -   Exposed on `8081`

* * * * *

🛠️ Tech Stack
--------------

### Frontend

-   React

-   Chat-style UI

-   Recipe generation & sharing flow

### Backend

-   Node.js

-   Express

-   JWT authentication

-   MongoDB integration

-   Serves as the **single entry point** for the frontend

### AI Layer

-   Python FastAPI

-   LangChain

-   LLM-powered recipe generation

-   Conversation memory handling

-   Structured output enforcement

### Database

-   MongoDB

-   Containerized for local development

* * * * *

⚙️ Environment Configuration
----------------------------

### Backend (`server/.env`)

`PORT=5001
MONGO_URI=mongodb://mongo:27017/shredmacro
JWT_SECRET=your_secret
AI_SERVICE_URL=http://ai-service:8000`

### AI Service (`ai-service/.env`)

`OPENAI_API_KEY=your_key`

* * * * *

▶️ Running the Project (Docker)
-------------------------------

### 1️⃣ Clone the repository

`git clone https://github.com/aryansinha1818/Shred-Macros.git
cd Shred-Macros`

### 2️⃣ Build and start all services

`docker-compose up --build`

### 3️⃣ Access running services

-   Frontend → `http://localhost:5173`

-   Backend → `http://localhost:5001`

-   AI Service → `http://localhost:8000`

-   Mongo Express → `http://localhost:8081`

* * * * *

🎯 Engineering Highlights
-------------------------

-   Clear separation of frontend, backend, AI, and database layers

-   Docker networking used instead of `localhost`

-   Backend mediates all database access

-   AI logic isolated as a dedicated microservice

-   Container-based architecture aligned with real-world systems

* * * * *

👨‍💻 Author
------------

**Aryan Sinha**\
Backend & GenAI Developer

📧 Email: <aryan.sinha1818@gmail.com>\
🔗 LinkedIn: <https://www.linkedin.com/in/aryan-sinha-877698212/>
