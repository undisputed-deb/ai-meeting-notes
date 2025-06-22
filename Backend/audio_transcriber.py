# audio_transcriber.py

import requests
import time

ASSEMBLY_API_KEY = "69e3711209cb491988478d1063f1cf12"

def transcribe_audio(filepath):
    # Step 1: Upload the audio file to AssemblyAI
    headers = {'authorization': ASSEMBLY_API_KEY}
    
    with open(filepath, 'rb') as f:
        upload_response = requests.post(
            'https://api.assemblyai.com/v2/upload',
            headers=headers,
            files={'file': f}
        )
    upload_url = upload_response.json()['upload_url']

    # Step 2: Start the transcription job
    transcript_request = {
        'audio_url': upload_url,
        'speaker_labels': False,
        'auto_chapters': False
    }

    transcript_response = requests.post(
        'https://api.assemblyai.com/v2/transcript',
        json=transcript_request,
        headers=headers
    )
    
    transcript_id = transcript_response.json()['id']

    # Step 3: Poll for the result
    polling_endpoint = f'https://api.assemblyai.com/v2/transcript/{transcript_id}'

    while True:
        polling_response = requests.get(polling_endpoint, headers=headers)
        status = polling_response.json()['status']

        if status == 'completed':
            return polling_response.json()['text']
        elif status == 'error':
            raise Exception(f"Transcription failed: {polling_response.json()['error']}")
        
        time.sleep(3)
