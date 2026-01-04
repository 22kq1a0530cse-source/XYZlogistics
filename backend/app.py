from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo

app = Flask(__name__)
CORS(app)

# -------------------------------
# MongoDB Atlas Configuration
# -------------------------------
# 🔴 IMPORTANT: Replace USERNAME, PASSWORD, CLUSTER
app.config["MONGO_URI"] = (
    "mongodb+srv://22kq1a0530cse_db_user:Jayasni530@cluster0.0wpydpk.mongodb.net/xyzlogistics?retryWrites=true&w=majority"
)

mongo = PyMongo(app)

# -------------------------------
# Health Check API
# -------------------------------
@app.route("/", methods=["GET"])
def health():
    return {"status": "Backend running successfully"}, 200

# -------------------------------
# Truck APIs
# -------------------------------

# Get all trucks
@app.route("/api/trucks", methods=["GET"])
def get_trucks():
    trucks = list(mongo.db.trucks.find({}, {"_id": 0}))
    return jsonify(trucks), 200


# Add a new truck
@app.route("/api/trucks", methods=["POST"])
def add_truck():
    data = request.json

    if not data or "truck_no" not in data:
        return {"error": "truck_no is required"}, 400

    mongo.db.trucks.insert_one(data)
    return {"message": "Truck added successfully"}, 201


# Get single truck by truck_no
@app.route("/api/trucks/<truck_no>", methods=["GET"])
def get_truck(truck_no):
    truck = mongo.db.trucks.find_one({"truck_no": truck_no}, {"_id": 0})

    if not truck:
        return {"error": "Truck not found"}, 404

    return jsonify(truck), 200


# -------------------------------
# Run Server
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True)
