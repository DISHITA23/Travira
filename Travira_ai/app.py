from flask import Flask, request, jsonify
from nlp_service import ask_ai
from ocr_service import process_receipt

app = Flask(__name__)

@app.post("/chat")
def chat():
    msg = request.json.get("message", "")
    reply = ask_ai(msg)
    return jsonify({"response": reply})

@app.post("/ocr")
def ocr():
    file = request.files["file"]
    path = "uploaded.jpg"
    file.save(path)
    return jsonify(process_receipt(path))

if __name__=="__main__":
    app.run(host="0.0.0.0", port=9000, debug=True)
