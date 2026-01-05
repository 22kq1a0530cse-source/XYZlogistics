import express from "express";
import Truck from "../models/Truck.js";

const router = express.Router();

/* ===========================
   GET ALL TRUCKS
=========================== */
router.get("/trucks", async (req, res) => {
  try {
    const trucks = await Truck.find().sort({ createdAt: -1 });
    res.json(trucks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   GET SINGLE TRUCK
=========================== */
router.get("/trucks/:truckNo", async (req, res) => {
  try {
    const truck = await Truck.findOne({
      truck_no: req.params.truckNo
    });

    if (!truck) {
      return res.status(404).json({ message: "Truck not found" });
    }

    res.json(truck);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   ADD NEW TRUCK
=========================== */
router.post("/trucks", async (req, res) => {
  try {
    const { truck_no, driver_id, safety_bucket } = req.body;

    if (!truck_no || !driver_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await Truck.findOne({ truck_no });
    if (exists) {
      return res.status(400).json({ message: "Truck already exists" });
    }

    const truck = new Truck({
      truck_no,
      driver_id,
      safety_bucket
    });

    await truck.save();
    res.status(201).json(truck);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Truck already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   DELETE TRUCK
=========================== */
router.delete("/trucks/:truckNo", async (req, res) => {
  try {
    const deleted = await Truck.findOneAndDelete({
      truck_no: req.params.truckNo
    });

    if (!deleted) {
      return res.status(404).json({ message: "Truck not found" });
    }

    res.json({ message: "Truck deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
