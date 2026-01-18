# EarthScape Climate Analytics System

## Introduction

Climate change is one of the most critical global challenges. Large-scale climate data generated from satellites, weather stations, and sensors requires advanced big data technologies for effective analysis and decision-making.

The **EarthScape Climate Analytics System** provides a scalable, secure, and intelligent platform for climate data analysis, supporting informed decisions to address climate change.

## Project Requirements

The system must:

- Securely authenticate users.
- Ingest climate data from multiple sources.
- Store large datasets in a distributed environment.
- Process batch and real-time data.
- Apply machine learning models.
- Visualize results and generate alerts.

## Functional Requirements

- **User Authentication and Authorization**: Secure login and role verification.
- **Data Ingestion**: Support for both historical and real-time data from satellites, weather stations, and sensors.
- **Distributed Data Storage**: Utilizing HDFS for scalable storage.
- **Data Processing**: Using Hadoop MapReduce for efficient processing.
- **Machine Learning**: Implementation of models for prediction and anomaly detection.
- **Data Visualization**: Interactive dashboards for monitoring.
- **Alerts and Notifications**: System alerts based on threshold checks.
- **Feedback and Support System**.

## Non-Functional Requirements

- **High Performance and Optimization**.
- **Data Security and Encryption**.
- **Reliability**: Targeting 99% uptime.
- **Scalability and Load Balancing**.
- **Compliance with Data Standards**.
- **Complete Documentation**.

## Technologies Used (Modernized Stack)

- **Frontend**: Next.js (React) for a responsive, interactive dashboard.
- **Backend**: Python FastAPI for high-performance REST APIs and ML integration.
- **Storage**:
  - **Hadoop/HDFS**: For storing massive raw datasets (historical/satellite).
  - **MongoDB**: For fast access to processed data, user profiles, and app state.
- **Processing**:
  - **Apache Spark / MapReduce**: For batch processing raw data in HDFS.
  - **Python (Pandas/Scikit-learn)**: For data cleaning and model inference.
- **Machine Learning**: Scikit-learn, TensorFlow/PyTorch (managed via FastAPI).
- **Visualization**: Recharts or Chart.js (integrated into Next.js) replacing external tools like Tableau for the main UI.

## System Architecture and Flow

The system adopts a modern web architecture backed by big data processing.

### Data & Application Flow

1.  **User Layer (Next.js)**:
    - Users interact with the **Next.js** frontend.
    - Dashboards request analytics and predictions via REST API calls.
2.  **API Layer (FastAPI)**:
    - **FastAPI** acts as the central gateway.
    - Handles Authentication (JWT).
    - Routes requests:
      - **To MongoDB**: For fast retrieval of pre-processed stats, user data, and logs.
      - **To ML Engine**: Sends input data to loaded Python models for real-time predictions.
3.  **Data Processing Layer (Offline/Batch)**:
    - Raw data enters **HDFS** from satellites/stations.
    - **MapReduce/Spark** jobs (scheduled via Airflow or cron) clean and aggregate this raw data.
    - Aggregated insights are saved to **MongoDB** for quick access by the API.
4.  **Machine Learning Layer**:
    - Models are trained on historical data from HDFS.
    - Trained models are serialized and loaded into the FastAPI backend service for inference.

### System Layers

- **Step 1: User Layer**
  - Web / Dashboard Interface
  - Login & Role Verification
- **Step 2: Data Source Layer**
  - Satellite Data
  - Weather Station Data
  - Sensor Data
- **Step 3: Data Ingestion Layer**
  - Batch Ingestion
  - Real-time Streaming
- **Step 4: Storage Layer**
  - HDFS (Raw Data)
  - MongoDB / Impala (Processed Data)
- **Step 5: Processing Layer**
  - Hadoop MapReduce
  - Data Cleaning
  - Pattern & Anomaly Detection
- **Step 6: Analytics & ML Layer**
  - Prediction Models
  - Trend Analysis
  - Model Updates
- **Step 7: Visualization Layer**
  - Next.js Custom Dashboards
  - Interactive Charts (Recharts/Chart.js)
- **Step 8: Alert & Notification Layer**
  - Threshold Checks
  - Email / System Alerts
- **Step 9: Monitoring & Security Layer**
  - Performance Monitoring
  - Access Logs
  - Encryption
