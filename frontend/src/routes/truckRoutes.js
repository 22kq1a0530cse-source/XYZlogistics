import express from "express";
import Truck from "../models/Truck.js";

const router = express.Router();

// ✅ GET ALL TRUCKS
router.get("/trucks", async (req, res) => {
  try {
    const trucks = await Truck.find();
    res.json(trucks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET SINGLE TRUCK
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

export default router;