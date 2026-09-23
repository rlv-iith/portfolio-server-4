# Interactive AI Portfolio — Project Guide

This repository is the **backend/inference orchestration layer** of my Interactive AI Portfolio.

The complete project is split across a frontend, backend, and AI inference repository.

---

## 🌐 Start Here — Live Product

### 🚀 [Open the Live Application](https://portfolio-server-4-kg3z.onrender.com/)

Start with the deployed application to see the complete system in action.

Explore the interactive portfolio and its AI-powered functionality before diving into the implementation.

---

# 🧭 Project Tour

Follow the repositories in this order to understand the complete system.

### 1. 🎨 Frontend

**Repository:**  
https://github.com/rlv-iith/portfolio-server-4

The frontend contains the interactive portfolio experience and communicates with the backend APIs.

**Explore here:**
- UI / UX
- Interactive portfolio
- API integration
- Client-side AI interactions
- Frontend architecture

⬇️

### 2. ⚙️ Backend — This Repository

**Repository:**  
https://github.com/rlv-iith/portfolio-server-3

This is the central **AI orchestration and backend layer**.

**Explore here:**
- Multi-LLM API routing
- 8+ LLM provider integrations
- Python `asyncio`
- Concurrent Race Mode
- `FIRST_COMPLETED` inference
- Streaming responses
- Provider selection
- Request cancellation
- Latency tracking
- Provider win-rate telemetry
- Google Sheets telemetry
- Server-to-server OAuth
- Azure Key Vault integration

The most important implementation to inspect is the **LLM routing / inference orchestration code**.

⬇️

### 3. 🧠 AI Brain — Local AI & RAG

**Repository:**  
https://github.com/rlv-iith/AI-Brain

This repository contains the deeper local AI/inference work.

**Explore here:**
- Custom PyTorch inference
- Phi-3.5-Mini
- Layer-by-layer weight loading
- KV caching
- Local semantic RAG
- Memory-constrained inference
- Model execution pipeline

This is where to look for the **custom local inference engine**.

---

# 🏗️ How Everything Fits Together

```text
                    ┌──────────────────────┐
                    │    LIVE PORTFOLIO    │
                    │                      │
                    │  Render Deployment   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      FRONTEND        │
                    │                      │
                    │ portfolio-server-4   │
                    └──────────┬───────────┘
                               │
                         API Requests
                               │
                               ▼
                    ┌──────────────────────┐
                    │       BACKEND        │
                    │                      │
                    │ portfolio-server-3   │
                    │                      │
                    │ • LLM Router         │
                    │ • Async Inference    │
                    │ • Race Mode          │
                    │ • Streaming          │
                    │ • Telemetry          │
                    └───────┬───────┬──────┘
                            │       │
                  ┌─────────┘       └──────────┐
                  ▼                            ▼
          ┌───────────────┐            ┌──────────────┐
          │ 8+ LLM APIs   │            │  AI BRAIN    │
          │               │            │              │
          │ Concurrent    │            │ PyTorch      │
          │ Race Mode     │            │ Phi-3.5      │
          └───────────────┘            │ RAG + KV     │
                                       └──────────────┘
                                              
                            │
                            ▼
                    ┌──────────────────┐
                    │    TELEMETRY     │
                    │                  │
                    │ Google Sheets    │
                    │ Azure Key Vault  │
                    └──────────────────┘
