from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import certifi

app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"])

# ================= DATABASE =================
MONGO_URI = (
    "mongodb+srv://22kq1a0530cse_db_user:"
    "Jayasni530"
    "@cluster0.0wpydpk.mongodb.net/"
    "xyzlogistics?retryWrites=true&w=majority"
)

try:
    client = MongoClient(
        MONGO_URI,
        tlsCAFile=certifi.where(),
        serverSelectionTimeoutMS=5000
    )
    client.admin.command("ping")
    print("✅ MongoDB Atlas connected successfully")
except Exception as e:
    print("❌ MongoDB connection failed:", e)

db = client["xyzlogistics"]
users = db["users"]

# ================= REGISTER =================
@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Missing fields"}), 400

    if users.find_one({"username": username}):
        return jsonify({"message": "User already exists"}), 409

    users.insert_one({
        "username": username,
        "password": password,
        "role": "user"
    })

    return jsonify({"message": "Registration successful"}), 201


# ================= LOGIN =================
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    user = users.find_one({
        "username": data.get("username"),
        "password": data.get("password")
    })

    if not user:
        return jsonify({"message": "Invalid credentials"}), 401

    return jsonify({
        "message": "Login successful",
        "role": user["role"],
        "username": user["username"]
    })


# ================= ADMIN LOGIN =================
@app.route("/api/admin-login", methods=["POST"])
def admin_login():
    data = request.json

    if data["username"] == "admin" and data["password"] == "admin123":
        return jsonify({
            "message": "Admin login successful",
            "role": "admin",
            "username": "Admin"
        })

    return jsonify({"message": "Invalid admin credentials"}), 401


if __name__ == "__main__":
    app.run(debug=True, port=5000)