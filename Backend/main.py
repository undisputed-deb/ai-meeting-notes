from gemini_summarizer import extract_action_items, analyze_sentiment, generate_summary # Updated import
from mongodb_handler import save_to_mongo
from audio_transcriber import transcribe_audio

def run_pipeline():
    print(" Script started")

    audio_file_path = "record_out.wav"

    transcript = "" 
    try:
        transcript = transcribe_audio(audio_file_path)
        if not transcript:
            print("Skipping AI analysis and saving due to empty transcript.")
            return
        print("Transcription complete. Proceeding with AI analysis.")
    except FileNotFoundError as e:
        print(f" Error: {e}")
        print("Please ensure your audio file path is correct.")
        return
    except ValueError as e: 
        print(f" Error during audio processing: {e}")
        print("Please ensure the audio file is in WAV format.")
        return
    except Exception as e:
        print(f" An unexpected error occurred during transcription: {e}")
        return

    # --- Sentiment Analysis (existing) ---
    sentiment = "Neutral" 
    if transcript: 
        try:
            sentiment = analyze_sentiment(transcript)
            print(f" Meeting Sentiment: {sentiment}")
        except Exception as e:
            print(f" Error analyzing sentiment: {e}")
            sentiment = "Error" 
    
    # --- NEW: Summary Generation ---
    meeting_summary = "No summary generated." # Default in case of error
    if transcript:
        try:
            meeting_summary = generate_summary(transcript)
            print(f" Meeting Summary:\n{meeting_summary}")
        except Exception as e:
            print(f" Error generating meeting summary: {e}")
            meeting_summary = "Summary generation failed."

    # --- Existing Action Item Extraction and Saving ---
    try:
        action_items = extract_action_items(transcript)
        print(" Action Items Extracted:", action_items)
        
        # Pass sentiment and summary along with other data to save_to_mongo
        save_to_mongo(transcript, action_items, sentiment, meeting_summary) # Updated call
        print(" Saved to MongoDB successfully!")
    except Exception as e:
        print(" Error during AI processing or database saving:", e)

if __name__ == "__main__":
    run_pipeline()