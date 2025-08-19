from flask import Flask, request, jsonify
from flask_cors import CORS
from audio_transcriber import transcribe_audio
from gemini_summarizer import extract_summary_and_enhanced_analysis
from mongodb_handler import save_to_mongo
import os
import traceback
from mutagen import File as MutagenFile
import math

app = Flask(__name__)
CORS(app)  # ✅ Enables CORS for all routes

def estimate_duration(filepath, transcript):
    """
    Estimate meeting duration using audio file metadata or transcript word count
    """
    try:
        # Method 1: Try to get actual duration from audio file metadata
        audio_file = MutagenFile(filepath)
        if audio_file and hasattr(audio_file, 'info') and hasattr(audio_file.info, 'length'):
            duration_seconds = int(audio_file.info.length)
            minutes = duration_seconds // 60
            seconds = duration_seconds % 60
            return f"{minutes}:{seconds:02d}"
    except Exception as e:
        print(f"Could not get audio duration from metadata: {e}")
    
    # Method 2: Fallback to word count estimation
    # Average speaking rate is ~150 words per minute
    if transcript:
        word_count = len(transcript.split())
        estimated_minutes = math.ceil(word_count / 150)
        return f"~{estimated_minutes} min"
    
    return "Unknown"

@app.route('/api/process-audio', methods=['POST'])
def process_audio():
    try:
        print("📥 Request received at /api/process-audio")

        if 'audio' not in request.files:
            print("❌ No audio file in request.")
            return jsonify({'error': 'No audio file uploaded'}), 400

        audio = request.files['audio']
        filename = audio.filename
        print(f"📂 Received file: {filename}")

        filepath = os.path.join("temp", filename)
        os.makedirs("temp", exist_ok=True)
        audio.save(filepath)
        print(f"✅ File saved to {filepath}")

        # Step 1: Transcribe
        print("🎙️ Starting transcription...")
        transcript = transcribe_audio(filepath)
        print(f"📝 Transcript: {transcript[:100]}...")

        # Step 2: Estimate Duration
        print("⏱️ Estimating meeting duration...")
        duration = estimate_duration(filepath, transcript)
        print(f"📊 Estimated duration: {duration}")

        # Step 3: Enhanced Analysis with Gemini (Summary, Sentiment, Purpose, Tags)
        print("🤖 Sending transcript to Gemini for enhanced analysis...")
        summary, sentiment, meeting_purpose, auto_tags = extract_summary_and_enhanced_analysis(transcript)
        print("✅ Gemini enhanced analysis complete")

        # Step 4: Save to MongoDB (you can update this to include new fields)
        print("💾 Saving result to MongoDB...")
        save_to_mongo(transcript, summary, sentiment, meeting_purpose, auto_tags, duration)
        print("✅ Saved to MongoDB")

        # Clean up temp file
        try:
            os.remove(filepath)
            print("🗑️ Temp file cleaned up")
        except:
            pass

        return jsonify({
            'transcript': transcript,
            'summary': summary,
            'sentiment': sentiment,
            'duration': duration,
            'meetingPurpose': meeting_purpose,
            'autoTags': auto_tags
        })

    except Exception as e:
        print("🔥 Exception occurred:")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)


# For Vercel deployment
if __name__ == '__main__':
    app.run()

# For Vercel deployment
if __name__ == '__main__':
    app.run()

# Export for Vercel
application = app
