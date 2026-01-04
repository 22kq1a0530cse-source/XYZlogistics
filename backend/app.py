from flask import Flask # type: ignore
from flask_cors import CORS # type: ignore

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def health():
    return {"status": "Backend running successfully"}, 200

if __name__ == "__main__":
    app.run(debug=True)
