from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient, ReturnDocument
import certifi

# ================= APP =================
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# ================= HELPERS =================
def get_role():
    return request.headers.get("x-role")

def get_user():
    return request.headers.get("x-user")

# ================= DATABASE =================
MONGO_URI = "mongodb+srv://22kq1a0530cse_db_user:Jayasni530@cluster0.0wpydpk.mongodb.net/xyzlogistics"
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client["xyzlogistics"]

drivers = db["drivers"]
trucks = db["trucks"]
users = db["users"]
trips = db["trips"]
attendance = db["attendance"]
salary = db["salary"]
safety = db["safety"]
counters = db["counters"]

print("✅ MongoDB Connected")

# ================= ADMIN =================
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"

# ================= LOGIN =================
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        return jsonify({"role": "admin", "username": "admin"}), 200

    driver = drivers.find_one(
        {"driver_id": username, "password": password},
        {"_id": 0}
    )

    if not driver:
        return jsonify({"message": "Invalid Driver ID or Password"}), 401

    return jsonify({"role": "driver", "username": driver["driver_id"]}), 200

# ================= DRIVER ID =================
def get_next_driver_id():
    counter = counters.find_one_and_update(
        {"_id": "driver_id"},
        {"$inc": {"sequence_value": 1}},
        return_document=ReturnDocument.AFTER,
        upsert=True
    )
    return f"D{counter['sequence_value']:03d}"

# =================================================
# ================= DRIVERS =======================
# =================================================

@app.route("/api/drivers", methods=["GET"])
def get_drivers():
    if get_role() == "driver":
        driver = drivers.find_one({"driver_id": get_user()}, {"_id": 0})
        return jsonify([driver] if driver else [])
    return jsonify(list(drivers.find({}, {"_id": 0})))

@app.route("/api/drivers", methods=["POST"])
def add_driver():
    if get_role() != "admin":
        return jsonify({"message": "Admin only"}), 403

    data = request.json
    driver_id = data.get("driver_id") or get_next_driver_id()

    if drivers.find_one({"driver_id": driver_id}):
        return jsonify({"message": "Driver already exists"}), 409

    drivers.insert_one({
        "driver_id": driver_id,
        "license_no": data.get("license_no", ""),
        "password": data.get("password", "1234"),
        "name": data.get("name", ""),
        "age": data.get("age", ""),
        "experience": data.get("experience", ""),
        "trips": 0,
        "overspeed": 0,
        "remarks": ""
    })

    return jsonify({"message": "Driver added", "driver_id": driver_id}), 201

@app.route("/api/drivers/<driver_id>", methods=["GET"])
def get_driver(driver_id):
    if get_role() == "driver" and driver_id != get_user():
        return jsonify({"message": "Access denied"}), 403

    driver = drivers.find_one({"driver_id": driver_id}, {"_id": 0})
    if not driver:
        return jsonify({"message": "Driver not found"}), 404

    return jsonify(driver)

@app.route("/api/drivers/<driver_id>/profile", methods=["PUT"])
def update_driver_profile(driver_id):
    if get_role() != "admin":
        return jsonify({"message": "Admin only"}), 403

    data = request.json

    result = drivers.update_one(
        {"driver_id": driver_id},
        {"$set": {
            "name": data.get("name", ""),
            "age": data.get("age", ""),
            "experience": data.get("experience", "")
        }}
    )

    if result.matched_count == 0:
        return jsonify({"message": "Driver not found"}), 404

    return jsonify({"message": "Profile updated"}), 200

# =================================================
# ================= TRUCKS ========================
# =================================================

@app.route("/api/trucks", methods=["GET"])
def get_trucks():
    if get_role() == "driver":
        return jsonify(list(trucks.find({"driver_id": get_user()}, {"_id": 0})))
    return jsonify(list(trucks.find({}, {"_id": 0})))

@app.route("/api/trucks/<truck_no>", methods=["GET"])
def get_single_truck(truck_no):
    truck = trucks.find_one({"truck_no": truck_no.strip().upper()}, {"_id": 0})
    if not truck:
        return jsonify({"message": "Truck not found"}), 404
    return jsonify(truck), 200

@app.route("/api/trucks", methods=["POST"])
def add_truck():
    if get_role() != "admin":
        return jsonify({"message": "Admin only"}), 403

    data = request.json
    truck_no = data["truck_no"].strip().upper()

    if trucks.find_one({"truck_no": truck_no}):
        return jsonify({"message": "Truck already exists"}), 409

    trucks.insert_one({
        "truck_no": truck_no,
        "driver_id": data.get("driver_id"),
        "safety_bucket": data.get("safety_bucket", "Green"),
        "trip_count": 0
    })

    return jsonify({"message": "Truck added"}), 201

@app.route("/api/trucks/<truck_no>", methods=["DELETE"])
def delete_truck(truck_no):
    if get_role() != "admin":
        return jsonify({"message": "Admin only"}), 403

    result = trucks.delete_one({"truck_no": truck_no.strip().upper()})
    if result.deleted_count == 0:
        return jsonify({"message": "Truck not found"}), 404

    return jsonify({"message": "Truck deleted"}), 200

# =================================================
# ================= TRIPS =========================
# =================================================

@app.route("/api/trips", methods=["GET"])
def get_trips():
    if get_role() == "driver":
        return jsonify(list(trips.find({"driver_id": get_user()}, {"_id": 0})))
    return jsonify(list(trips.find({}, {"_id": 0})))

@app.route("/api/trips/<trip_id>", methods=["GET"])
def get_single_trip(trip_id):
    trip = trips.find_one({"trip_id": trip_id.strip()}, {"_id": 0})
    if not trip:
        return jsonify({"message": "Trip not found"}), 404
    return jsonify(trip), 200

@app.route("/api/trips", methods=["POST"])
def add_trip():
    if get_role() != "admin":
        return jsonify({"message": "Admin only"}), 403

    data = request.json
    overspeed = bool(data.get("overspeed", False))

    trips.insert_one({
        "trip_id": data["trip_id"].strip(),
        "truck_no": data["truck_no"],
        "driver_id": data["driver_id"],
        "distance_km": data["distance_km"],
        "duration_hours": data["duration_hours"],
        "overspeed": overspeed
    })

    drivers.update_one(
        {"driver_id": data["driver_id"]},
        {"$inc": {"trips": 1, "overspeed": 1 if overspeed else 0}}
    )

    return jsonify({"message": "Trip added"}), 201

# =================================================
# ================= RUN =================
# =================================================

if __name__ == "__main__":
    app.run(debug=True, port=5000)