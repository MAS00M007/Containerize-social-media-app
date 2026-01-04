🚀 MERN Social Media Application

Dockerized • Nginx Reverse Proxy • Kubernetes-Ready

A full-stack social media web application built using the MERN stack, fully containerized with Docker, reverse-proxied using Nginx, and structured for Kubernetes deployment.

This project focuses on real-world DevOps practices, including multi-container architecture, Docker Hub image publishing, service-based networking, and production-level debugging.

✨ Features

🔐 User authentication & profile management

📝 Create posts with image uploads

🖼️ Serve static assets via backend

🌐 Nginx reverse proxy for frontend & API routing

🐳 Fully containerized using Docker & Docker Compose

📦 Docker images published to Docker Hub

☸️ Kubernetes-ready architecture

🛠️ Solved real production issues (DNS, networking, file handling)

🧱 Tech Stack
Frontend

React.js

HTML, CSS, JavaScript

Backend

Node.js

Express.js

MongoDB (Mongoose)

Multer (image uploads)

DevOps & Infrastructure

Docker & Docker Compose

Nginx (reverse proxy)

Docker Hub (image registry)

Kubernetes (Deployments, Services)

Linux container environment

🏗️ Architecture Overview
Client (Browser)
      ↓
Nginx (Reverse Proxy)
      ↓
Backend (Node.js / Express)
      ↓
MongoDB

Routing

/ → React frontend

/api/* → Backend API

/assets/* → Static images served from backend

🐳 Docker Setup
Services

backend – Node.js API server

nginx – Reverse proxy & frontend server

mongo – MongoDB database

Build & Run
docker compose build
docker compose up -d

📦 Docker Images

Published and ready to use:

masoom007/mern-backend

masoom007/mern-nginx

Images are hosted on Docker Hub and can be directly pulled in Kubernetes.

☸️ Kubernetes Readiness

The application is designed to run seamlessly on Kubernetes:

Images pulled from Docker Hub

Service-based internal DNS

Stateless backend containers

MongoDB prepared for persistent volumes

Nginx ready for ConfigMaps or Ingress

Example Commands
kubectl get pods
kubectl get services

🛠️ Production Issues Solved

This project includes real debugging experience, not toy examples:

❌ Docker DNS resolution failures

✅ Fixed using proper service naming and network configuration

❌ Image upload failures due to smart quotes (“ ”)

✅ Implemented filename sanitization (Linux-safe)

❌ Nginx upstream resolution errors

✅ Correct service-based proxy configuration

❌ MongoDB connection errors (localhost misuse)

✅ Fixed using Docker service DNS (mongo)

📂 Environment Variables

Create a .env file inside the backend directory:

PORT=3001
MONGO_URL=mongodb://mongo:27017/social_app

🎯 Learning Outcomes

Practical Docker multi-container architecture

Nginx reverse proxy configuration

Service-based networking in Docker & Kubernetes

Debugging real production issues

Kubernetes-ready application design
