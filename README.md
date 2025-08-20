# 🚀 AI Meeting Notes Dashboard

**Transform your meeting recordings into actionable insights with AI-powered transcription, summarization, and sentiment analysis.**

[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Flask%20%7C%20MongoDB-blue)](/)
[![License](https://img.shields.io/badge/License-MIT-green)](/)
[![Status](https://img.shields.io/badge/Status-Active-success)](/)

> **Turn conversations into intelligence.** Upload audio recordings and get instant transcripts, executive summaries, sentiment analysis, and actionable insights powered by Google Gemini AI.

---

## ✨ Features

### 🎙️ **Smart Audio Processing**
- **Multi-format Support**: Process `.wav`, `.mp3`, and `.mp4` files
- **High-Quality Transcription**: Accurate speech-to-text conversion
- **Long Recording Support**: Handle meetings up to 45+ minutes

### 🤖 **AI-Powered Analysis**
- **Executive Summaries**: Concise meeting overviews
- **Sentiment Analysis**: Understand meeting tone and engagement
- **Action Items**: Automatically extract key tasks and decisions
- **Confidence Scoring**: AI reliability indicators

### 🎨 **Modern Interface**
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Processing**: Live updates during transcription
- **Export Options**: Download PDF reports or copy to clipboard
- **Dark/Light Mode**: Customizable viewing experience

### 🔒 **Secure & Scalable**
- **Cloud Storage**: MongoDB Atlas integration
- **Data Privacy**: Secure handling of sensitive meeting content
- **Extensible Architecture**: Easy to add new AI features

---

## 🏗️ Architecture

```
ai-meeting-notes/
├── Frontend/                 # React + TypeScript UI
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Main application pages
│   │   └── hooks/           # Custom React hooks
│   └── public/              # Static assets
│
└── Backend/                 # Python Flask API
    ├── app.py              # Main Flask application
    ├── audio_transcriber.py # Audio processing logic
    ├── gemini_summarizer.py # AI analysis integration
    ├── mongodb_handler.py   # Database operations
    ├── config.py           # Configuration (API keys)
    └── requirements.txt    # Python dependencies
```

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+**
- **Node.js 16+**
- **MongoDB Atlas Account** (free tier available)
- **Google AI API Key** (Gemini)

### 1. Clone & Setup

```bash
git clone https://github.com/your-username/ai-meeting-notes.git
cd ai-meeting-notes
```

### 2. Backend Setup

```bash
cd Backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure API keys
cp config.py.example config.py
# Edit config.py with your actual API keys
```

**config.py example:**
```python
GEMINI_API_KEY = "your-gemini-api-key"
MONGODB_URI = "mongodb+srv://username:password@cluster.mongodb.net/"
```

```bash
# Start backend server
python3 app.py
```
*Backend runs on `http://127.0.0.1:5000`*

### 3. Frontend Setup

```bash
cd ../Frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_BACKEND_URL=http://127.0.0.1:5000" > .env

# Start development server
npm run dev
```
*Frontend runs on `http://localhost:8080`*

### 4. Database Setup

```bash
# Start MongoDB (if running locally)
brew services start mongodb-community

# Or use MongoDB Atlas (recommended)
# Get connection string from MongoDB Atlas dashboard
```

---

## 🎯 Usage

1. **Upload**: Drag & drop or select your meeting audio file
2. **Process**: Watch real-time transcription and AI analysis
3. **Review**: Get instant summaries, sentiment, and action items
4. **Export**: Download PDF reports or copy results
5. **Store**: All data automatically saved for future reference

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful components
- **Lucide Icons** - Clean iconography

### Backend
- **Python 3.8+** - Core language
- **Flask** - Lightweight web framework
- **Google Gemini AI** - Advanced language model
- **PyMongo** - MongoDB driver
- **Mutagen** - Audio file handling

### Database & AI
- **MongoDB Atlas** - Cloud database
- **Google AI Studio** - Gemini API access

---

## 📊 API Reference

### Upload & Process Audio
```http
POST /api/process-audio
Content-Type: multipart/form-data

{
  "audio": <file>
}
```

**Response:**
```json
{
  "id": "unique-id",
  "transcript": "Meeting transcript...",
  "summary": "Executive summary...",
  "sentiment": "Positive",
  "confidence": 0.95,
  "action_items": ["Task 1", "Task 2"],
  "duration": "~15 min",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

---

## 🔧 Environment Variables

### Backend
```bash
GEMINI_API_KEY=your-gemini-api-key
MONGODB_URI=your-mongodb-connection-string
PORT=5000
```

### Frontend
```bash
VITE_BACKEND_URL=http://127.0.0.1:5000
```

---

## 🚀 Deployment

### Local Development
Follow the Quick Start guide above.

### Production Deployment

**Backend Options:**
- Railway (recommended for Flask)
- Heroku
- Vercel (with serverless functions)
- DigitalOcean App Platform

**Frontend Options:**
- Vercel (recommended)
- Netlify
- GitHub Pages

**Database:**
- MongoDB Atlas (recommended)
- Railway PostgreSQL

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google AI** for Gemini API
- **MongoDB** for Atlas database
- **React Team** for the amazing framework
- **shadcn** for beautiful UI components

---

## 📞 Contact

**Debashrestha Nandi**
- 📧 Email: deb86011@gmail.com
- 💼 LinkedIn: [Debashrestha Nandi](https://www.linkedin.com/in/debashrestha-nandi-a7343b171/)
- 🐙 GitHub: [@undisputed-deb](https://github.com/undisputed-deb)

---

<div align="center">

**⭐ Star this repo if you find it helpful! ⭐**

*Making every meeting count with AI intelligence.*

</div>
