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
# Driver APIs
# -------------------------------

# Get all drivers
@app.route("/api/drivers", methods=["GET"])
def get_drivers():
    drivers = list(mongo.db.drivers.find({}, {"_id": 0}))
    return jsonify(drivers), 200


# Add a new driver
@app.route("/api/drivers", methods=["POST"])
def add_driver():
    data = request.json

    if not data or "driver_id" not in data:
        return {"error": "driver_id is required"}, 400

    mongo.db.drivers.insert_one(data)
    return {"message": "Driver added successfully"}, 201


# Get single driver
@app.route("/api/drivers/<driver_id>", methods=["GET"])
def get_driver(driver_id):
    driver = mongo.db.drivers.find_one({"driver_id": driver_id}, {"_id": 0})

    if not driver:
        return {"error": "Driver not found"}, 404

    return jsonify(driver), 200
# -------------------------------
# Trip APIs
# -------------------------------

# Add a trip
@app.route("/api/trips", methods=["POST"])
def add_trip():
    data = request.json

    if not data or "trip_id" not in data:
        return {"error": "trip_id is required"}, 400

    mongo.db.trips.insert_one(data)
    return {"message": "Trip added successfully"}, 201


# Get all trips
@app.route("/api/trips", methods=["GET"])
def get_trips():
    trips = list(mongo.db.trips.find({}, {"_id": 0}))
    return jsonify(trips), 200


# Get trips by driver
@app.route("/api/trips/driver/<driver_id>", methods=["GET"])
def get_trips_by_driver(driver_id):
    trips = list(mongo.db.trips.find({"driver_id": driver_id}, {"_id": 0}))
    return jsonify(trips), 200
# Get single trip by trip_id
@app.route("/api/trips/<trip_id>", methods=["GET"])
def get_trip(trip_id):
    trip = mongo.db.trips.find_one({"trip_id": trip_id}, {"_id": 0})

    if not trip:
        return {"error": "Trip not found"}, 404

    return jsonify(trip), 200
# -------------------------------
# Attendance APIs
# -------------------------------

@app.route("/api/attendance", methods=["POST"])
def mark_attendance():
    data = request.json

    if not data or "driver_id" not in data or "date" not in data:
        return {"error": "driver_id and date required"}, 400

    mongo.db.attendance.insert_one(data)
    return {"message": "Attendance marked"}, 201


@app.route("/api/attendance/<driver_id>", methods=["GET"])
def get_attendance(driver_id):
    records = list(
        mongo.db.attendance.find({"driver_id": driver_id}, {"_id": 0})
    )
    return jsonify(records), 200

# -------------------------------
# Salary APIs
# -------------------------------

@app.route("/api/salary/<driver_id>", methods=["GET"])
def calculate_salary(driver_id):
    driver = mongo.db.drivers.find_one({"driver_id": driver_id})

    if not driver:
        return {"error": "Driver not found"}, 404

    trips = list(mongo.db.trips.find({"driver_id": driver_id}))

    total_trips = len(trips)
    total_distance = sum(t.get("distance_km", 0) for t in trips)

    base_salary = driver.get("base_salary", 0)

    salary = (
        base_salary
        + (total_trips * 200)
        + (total_distance * 2)
    )

    return {
        "driver_id": driver_id,
        "base_salary": base_salary,
        "total_trips": total_trips,
        "total_distance": total_distance,
        "salary": salary
    }, 200
# -------------------------------
# Admin Login API
# -------------------------------

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json

    if not data:
        return {"error": "No data sent"}, 400

    username = data.get("username")
    password = data.get("password")

    if username == "admin" and password == "admin123":
        return jsonify({"message": "Login successful"}), 200

    return jsonify({"error": "Invalid credentials"}), 401





# -------------------------------
# Run Server
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True)
