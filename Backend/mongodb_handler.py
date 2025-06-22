# mongodb_handler.py

from pymongo import MongoClient
from datetime import datetime
import os

# MongoDB connection (update with your connection string)
client = MongoClient("mongodb://localhost:27017/")
db = client["meeting_notes"]
collection = db["meetings"]

def save_to_mongo(transcript, summary, sentiment, meeting_purpose, auto_tags, duration, action_items=None, keywords=None):
    """
    Save meeting analysis to MongoDB with new enhanced fields
    """
    try:
        document = {
            "transcript": transcript,
            "summary": summary,
            "sentiment": sentiment,
            "duration": duration,  # 🕐 NEW: Meeting duration
            "meeting_purpose": meeting_purpose,  # 🎯 NEW: Meeting purpose/type
            "auto_tags": auto_tags,  # 🏷️ NEW: Auto-tags for searchability
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        }
        
        # Add legacy fields if provided (for backwards compatibility)
        if action_items:
            document["action_items"] = action_items
        if keywords:
            document["keywords"] = keywords
        
        result = collection.insert_one(document)
        print(f"✅ Document saved to MongoDB with ID: {result.inserted_id}")
        return result.inserted_id
        
    except Exception as e:
        print(f"❌ MongoDB save error: {e}")
        return None

def get_meetings_by_tag(tag):
    """
    🆕 NEW FUNCTION: Search meetings by auto-tag
    """
    try:
        meetings = collection.find({"auto_tags": {"$in": [tag]}})
        return list(meetings)
    except Exception as e:
        print(f"❌ MongoDB search error: {e}")
        return []

def get_meetings_by_purpose(purpose):
    """
    🆕 NEW FUNCTION: Search meetings by purpose
    """
    try:
        meetings = collection.find({"meeting_purpose": purpose})
        return list(meetings)
    except Exception as e:
        print(f"❌ MongoDB search error: {e}")
        return []

def get_recent_meetings(limit=10):
    """
    Get recent meetings sorted by creation date
    """
    try:
        meetings = collection.find().sort("created_at", -1).limit(limit)
        return list(meetings)
    except Exception as e:
        print(f"❌ MongoDB fetch error: {e}")
        return []

def get_meeting_stats():
    """
    🆕 NEW FUNCTION: Get analytics about meetings
    """
    try:
        pipeline = [
            {
                "$group": {
                    "_id": "$meeting_purpose",
                    "count": {"$sum": 1},
                    "avg_sentiment": {"$avg": {
                        "$switch": {
                            "branches": [
                                {"case": {"$eq": ["$sentiment", "Positive"]}, "then": 1},
                                {"case": {"$eq": ["$sentiment", "Neutral"]}, "then": 0},
                                {"case": {"$eq": ["$sentiment", "Negative"]}, "then": -1}
                            ],
                            "default": 0
                        }
                    }}
                }
            },
            {"$sort": {"count": -1}}
        ]
        
        stats = list(collection.aggregate(pipeline))
        return stats
    except Exception as e:
        print(f"❌ MongoDB stats error: {e}")
        return []

# Legacy function (keep for backwards compatibility)
def save_to_mongo_legacy(transcript, summary, sentiment, action_items):
    """
    Legacy save function - converts to new format
    """
    return save_to_mongo(
        transcript=transcript,
        summary=summary,
        sentiment=sentiment,
        meeting_purpose="General Discussion",  # Default purpose
        auto_tags=["General", "Meeting"],  # Default tags
        duration="Unknown",  # Default duration
        action_items=action_items
    )