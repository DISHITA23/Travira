from anthropic import Anthropic
from dotenv import load_dotenv
import os

load_dotenv()
client = Anthropic(api_key=os.getenv("AI_API_KEY"))

def ask_ai(prompt):
    response = client.messages.create(
        model="claude-3-haiku-20240307",
        max_tokens=300,
        messages=[{"role":"user","content":prompt}]
    )
    return response.content[0].text
