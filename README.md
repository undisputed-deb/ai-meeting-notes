 🚀 AI Meeting Notes Dashboard: Transform Conversations into Actionable Intelligence

**Unlock the full potential of your meetings with AI-driven transcription, comprehensive analysis, and intuitive insights. This full-stack application seamlessly converts spoken words into structured, actionable intelligence, saving time and maximizing productivity.**

---

 ✨ Key Features & Benefits

-   **Intelligent Audio Processing:**
    -   **Flexible Uploads:** Effortlessly transcribe meeting recordings in popular formats (WAV, MP3, MP4).
    -   **High-Fidelity Transcription:** Accurately converts long audio files (up to 45+ minutes) into detailed text.
-   **Advanced Gemini AI Insights:**
    -   **Concise Executive Summaries:** Get straight to the core with brief, human-quality summaries of lengthy discussions.
    -   **Automated Sentiment Analysis:** Instantly grasp the overall tone of your meetings (Positive, Neutral, Negative) to gauge participant engagement and consensus.
    -   **AI Confidence Meter:** Understand the reliability of the generated insights with an integrated confidence score.
    -   **Intelligent Timestamps:** Navigate transcripts easily with automated time references for key discussion points (where supported by source audio).
-   **Intuitive & Responsive User Interface:**
    -   **Modern Dashboard:** A sleek, user-friendly React + TypeScript frontend designed for optimal readability and navigation.
    -   **Effortless Interaction:** Copy content or download comprehensive PDF reports with a single click.
-   **Robust Data Management:**
    -   **Secure MongoDB Atlas Integration:** All meeting data, transcripts, and analyses are securely stored and easily retrievable in the cloud.
-   **Scalable & Extensible Architecture:**
    -   Designed for future growth, allowing for seamless integration of new AI models, analysis features, or data sources.

---

 📸 Visual Showcase

### **1. Upload & Analyze Interface**
Experience a streamlined process for uploading your meeting audio and initiating AI analysis.
![Front End Dashboard](public/Front_ui.png)

### **2. Comprehensive Results Display**
View your meeting's executive summary, sentiment analysis, and detailed transcript in an organized, digestible format.
![AI Meeting Results](public/Result_display.png)

---

 🏗️ Project Architecture

This project adopts a clean, modular monorepo structure, separating concerns between the frontend UI and the powerful backend services.



.
├── /frontend           \# React + TypeScript dashboard UI
│   ├── public          \# Static assets (e.g., images)
│   ├── src             \# React components, services, and styling
│   └── ...
└── /backend            \# Python Flask API, AI processing, MongoDB integration
├── audio\_transcriber.py  \# Handles audio file transcription
├── gemini\_summarizer.py  \# Interacts with Gemini AI for summarization & sentiment
├── mongodb\_handler.py    \# Manages MongoDB interactions
├── main.py             \# Main Flask application entry point
├── config.py           \# Configuration for API keys (ENSURE THIS IS .GITIGNORED\!)
└── ...


---

## 🚀 Quick Start: Get Up and Running

Follow these steps to set up and run the AI Meeting Notes Dashboard locally:

### **1. Clone the Repository**

```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
````

### **2. Backend Setup**

Navigate into the `backend` directory, set up a virtual environment, install dependencies, and configure your API keys.

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows, use: .\venv\Scripts\activate
pip install -r requirements.txt
```

**Configuration (`config.py`):**
Create a `config.py` file in the `/backend` directory and add your API keys and MongoDB URI.

```python
# config.py (DO NOT COMMIT THIS FILE TO VERSION CONTROL)
GEMINI_API_KEY = "your-gemini-api-key-here"
MONGO_URI = "your-mongodb-atlas-connection-string"
```

*Replace `"your-gemini-api-key-here"` and `"your-mongodb-atlas-connection-string"` with your actual credentials.*

**Start the Backend Server:**

```bash
python3 main.py
```

*The backend server will typically run on `http://127.0.0.1:5000`.*

### **3. Frontend Setup**

Open a new terminal, navigate to the `frontend` directory, install dependencies, and start the development server.

```bash
cd ../frontend
npm install
npm run dev
```

*The frontend development server will typically start on `http://localhost:5173`.*

### **4. Access the Application**

Open your web browser and navigate to:

```
http://localhost:5173
```

(or the address provided by your Vite/React dev server).

-----

## 🔒 Security & Best Practices

  - **API Key Management:** Always ensure your `config.py` file (or any file containing sensitive credentials) is listed in your `.gitignore` to prevent accidental exposure in public repositories.
  - **Environment Variables:** For production deployments, it's recommended to manage API keys and sensitive configurations using environment variables rather than hardcoded files.
  - **Dependency Management:** Regularly update your project dependencies to patch security vulnerabilities.

-----

## 📝 Example Workflow

1.  **Upload:** Select your `.wav`, `.mp3`, or `.mp4` meeting audio file through the user-friendly interface.
2.  **Process:** The backend will securely receive the audio, initiate the transcription process, and then leverage Gemini AI for in-depth analysis.
3.  **Review:** Once processing is complete, the dashboard will present:
      * A concise executive summary.
      * The overall meeting sentiment.
      * An AI confidence score for the results.
      * The full transcribed text, often with timestamps.
4.  **Export:** Easily download a comprehensive PDF report of the analysis or copy the text directly to your clipboard.
5.  **Persistence:** All processed meeting data is automatically saved to your MongoDB Atlas instance for future reference.

-----

## 💡 Tech Stack

  - **Frontend:**
      - [React](https://react.dev/): A declarative, component-based JavaScript library for building user interfaces.
      - [TypeScript](https://www.typescriptlang.org/): A strongly typed superset of JavaScript that compiles to plain JavaScript.
      - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
      - [shadcn/ui](https://ui.shadcn.com/): Reusable components built with Radix UI and Tailwind CSS.
      - [Lucide Icons](https://lucide.dev/): A beautiful collection of open-source icons.
  - **Backend:**
      - [Python](https://www.python.org/): The primary programming language.
      - [Flask](https://flask.palletsprojects.com/): A lightweight WSGI web application framework.
      - [Google Gemini API](https://ai.google.dev/): Powers advanced AI capabilities like summarization and sentiment analysis.
      - [PyMongo](https://pymongo.readthedocs.io/en/stable/): Python driver for MongoDB.
  - **Database:**
      - [MongoDB Atlas](https://www.mongodb.com/atlas): A global cloud database service for modern applications.
  - **AI Services (Configurable):**
      - Primary: Google Gemini 1.5
      - Potential Integrations: OpenAI, AssemblyAI, etc.
  - **PDF Export:**
      - [jsPDF](https://www.google.com/search?q=https://raw.githack.com/MrRio/jsPDF/master/docs/): For client-side PDF generation.

-----

## 🛡️ License

This project is licensed under the MIT License. See the `LICENSE` file for details.

(C) 2025 Debashrestha Nandi

-----

## 🤝 Contact

For any questions, feedback, or collaboration opportunities, feel free to reach out:

  - **Email:** deb86011@gmail.com
  - **LinkedIn:** [Debashrestha Nandi](https://www.google.com/search?q=https://www.linkedin.com/in/debashrestha-nandi-a7343b171/)

**Empowering teams to make every meeting count\!**

```
```
