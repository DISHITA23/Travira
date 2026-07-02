import pytesseract
import cv2
import re
import os
from dotenv import load_dotenv

load_dotenv()

def extract_text(path):
    img = cv2.imread(path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray,(5,5),0)
    return pytesseract.image_to_string(blur, lang=os.getenv("OCR_LANGUAGE","eng"))

def process_receipt(path):
    text = extract_text(path)

    amount = re.findall(r'₹?\s?(\d{2,6}(?:\.\d{1,2})?)', text)
    dates = re.findall(r'\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4}', text)

    return {
        "raw_text":text,
        "probable_amount": amount[-1] if amount else None,
        "probable_date": dates[-1] if dates else None,
        "amount_list": amount,
        "date_list":dates
    }
