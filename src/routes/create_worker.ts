import express from "express";
import { Worker } from "../entities/Worker";
const router = express.Router();

router.post("/api/create_worker", async (req, res) => {
    const {
        first_name,
        last_name,
        id_number,
        working_section,
        salary,
        start_working_data,
        finish_working_data,
        reason_to_leave,
    } = req.body;
    const worker = Worker.create({
        first_name,
        last_name,
        id_number,
        working_section,
        salary,
        start_working_data,
        finish_working_data,
        reason_to_leave,
    });

    await worker.save();
    return res.json(worker);
});

// Get Request
router.get("/api/get_workers", async (req, res) => {
    const worker = await Worker.find();
    return res.json(worker);
});

export { router as createWorkerRouter };
