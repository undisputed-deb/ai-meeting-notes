import google.generativeai as genai
from config import GEMINI_API_KEY
import json

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash-latest")

def generate_summary(transcript):
    if not transcript.strip():
        print("Empty transcript. Skipping summarization.")
        return "Transcript is empty. No summary generated."

    prompt = f"""
    Provide a concise, single-paragraph summary of the following meeting transcript.
    Keep the summary to 3–5 sentences.
    Transcript:
    {transcript}
    """
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print("Gemini error (summary):", e)
        return "Summary not available."

def analyze_sentiment(transcript):
    prompt = f"""
    Analyze the overall sentiment of the following meeting transcript.
    Only respond with one word: Positive, Negative, or Neutral.
    Transcript:
    {transcript}
    """
    try:
        response = model.generate_content(prompt)
        sentiment = response.text.strip().capitalize()
        return sentiment if sentiment in ["Positive", "Negative", "Neutral"] else "Neutral"
    except Exception as e:
        print("Gemini error (sentiment):", e)
        return "Neutral"

def detect_meeting_purpose(transcript):
    """
    🎯 NEW FEATURE: Detect the purpose/type of the meeting
    """
    prompt = f"""
    Analyze the following meeting transcript and determine the primary purpose or type of meeting.
    
    Common meeting types include:
    - Daily Stand-up / Scrum
    - Sprint Planning
    - Sprint Retrospective
    - Project Review
    - Stakeholder Update
    - Team Sync
    - Client Meeting
    - Strategy Session
    - Product Demo
    - Training Session
    - One-on-One
    - All-Hands Meeting
    - Design Review
    - Technical Discussion
    - Budget Planning
    - Performance Review
    
    Respond with just the meeting type/purpose (2-4 words maximum).
    If unclear, respond with "General Discussion".
    
    Transcript:
    {transcript}
    """
    try:
        response = model.generate_content(prompt)
        purpose = response.text.strip()
        # Clean up the response to remove any extra text
        if len(purpose.split()) > 4:
            purpose = "General Discussion"
        return purpose
    except Exception as e:
        print("Gemini error (meeting purpose):", e)
        return "General Discussion"

def generate_auto_tags(transcript):
    """
    🏷️ NEW FEATURE: Generate 3-5 smart tags for searchability
    """
    prompt = f"""
    Generate 3-5 relevant tags for the following meeting transcript.
    Tags should be:
    - Single words or short phrases (1-2 words)
    - Relevant to the content, topics, or purpose
    - Useful for search and categorization
    - Professional and descriptive
    
    Return only a JSON array of strings, nothing else:
    ["tag1", "tag2", "tag3", "tag4", "tag5"]
    
    Example good tags: ["Design", "Feedback", "Sprint", "Budget", "Client", "Strategy", "Review", "Planning", "Technical", "UI/UX"]
    
    Transcript:
    {transcript}
    """
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        
        # Clean up the response to extract just the JSON array
        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()
        elif text.startswith("```"):
            text = text.replace("```", "").strip()
        
        # Parse JSON
        tags = json.loads(text)
        
        # Validate and limit to 5 tags maximum
        if isinstance(tags, list):
            tags = [str(tag).strip() for tag in tags[:5]]  # Max 5 tags
            return [tag for tag in tags if tag and len(tag) <= 20]  # Remove empty/too long tags
        else:
            return ["General", "Meeting"]
            
    except Exception as e:
        print("Gemini error (auto tags):", e)
        return ["General", "Meeting"]

def extract_summary_and_enhanced_analysis(transcript):
    """
    🚀 ENHANCED: Extract summary, sentiment, meeting purpose, and auto tags
    """
    summary = generate_summary(transcript)
    sentiment = analyze_sentiment(transcript)
    meeting_purpose = detect_meeting_purpose(transcript)
    auto_tags = generate_auto_tags(transcript)
    
    return summary, sentiment, meeting_purpose, auto_tags

# Legacy function for backwards compatibility (if needed elsewhere)
def extract_action_items(transcript):
    prompt = f"""
    Extract clear action items from the transcript. Respond in JSON format only:
    ```json
    [
      {{ "task": "description", "assignee": "person", "due": "YYYY-MM-DD or null" }}
    ]
    ```
    Transcript:
    {transcript}
    """
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        if text.startswith("```json") and text.endswith("```"):
            text = text[7:-3].strip()
        data = json.loads(text)
        return [f"{item['task']} (Assigned to {item['assignee']})" for item in data]
    except Exception as e:
        print("Gemini error (action items):", e)
        return ["No action items identified."]

def extract_keywords(transcript):
    prompt = f"""
    Extract 5–10 keywords or phrases from the transcript. Return only a JSON array.
    Transcript:
    {transcript}
    """
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        if text.startswith("["):
            return json.loads(text)
        return []
    except Exception as e:
        print("Gemini error (keywords):", e)
        return []

def extract_summary_and_actions(transcript):
    """
    🔄 LEGACY: Keep this for any existing code that still uses it
    """
    summary = generate_summary(transcript)
    sentiment = analyze_sentiment(transcript)
    action_items = extract_action_items(transcript)
    keywords = extract_keywords(transcript)
    return summary, sentiment, action_items, keywords