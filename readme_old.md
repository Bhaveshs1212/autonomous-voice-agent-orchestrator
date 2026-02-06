# Autonomous AI Voice Agent & RAG Memory System

## 🚀 Overview
This project is an **Autonomous Voice Orchestration Engine** designed to solve the "context retention" problem in AI telephony. It integrates **ElevenLabs** (Voice), **OpenAI** (Intelligence), **Pinecone** (Long-term Memory), and **n8n** (Orchestration).

The system features a **closed-loop architecture**:
1.  **Ingestion:** Processes inbound calls and extracts semantic intent.
2.  **Memory:** Vectors are stored in Pinecone for long-term retrieval.
3.  **Autonomous Callback:** A scheduler identifies "Callback" requests, retrieves historical context via RAG, and triggers an outbound call with the AI "aware" of the previous conversation.

## 🛠️ System Architecture

```mermaid
graph TD
    subgraph Ingestion Layer
        A[ElevenLabs Webhook] -->|JSON Payload| B(Data Extraction)
        B -->|Analysis| C{Intent Switch}
    end

    subgraph Memory & Logic
        C -->|Intent: Callback| D[Airtable: Schedule Queue]
        C -->|Intent: General| E[Generate Embeddings]
        E -->|Upsert Vector| F[(Pinecone DB)]
    end

    subgraph Autonomous Loop
        G[Cron Scheduler] -->|Poll| D
        D -->|Get Scheduled Item| H[Retrieve Context (RAG)]
        H -->|Query Vector DB| F
        F -->|Return Context| I[Inject into Prompt]
        I -->|Trigger Call| J[ElevenLabs SIP Trunk]
    end