import express from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Worker } from "../entities/Worker";
const router = express.Router();

// Add New Worker To Village
router.post("/api/create_worker",checkAuth, async (req, res) => {
    const {
        first_name,
        last_name,
        id_number,
        working_section,
        start_working_data,
        finish_working_data,
        reason_to_leave,
    } = req.body;
    const worker = Worker.create({
        first_name,
        last_name,
        id_number,
        working_section,
        start_working_data,
        finish_working_data,
        reason_to_leave,
    });

    await worker.save();
    return res.json(worker);
});


// Edit Selected Owner Data
router.post("/api/edit_worker/:worker_Id", checkAuth, async (req, res) => {
    const { worker_Id } = req.params;
    const {
        first_name,
        last_name,
        phone_number,
        id_number,
        working_section,
        start_working_data,
        finish_working_data,
        reason_to_leave,
    } = req.body;


    const worker = await Worker.findOneBy({
        id: req.params.worker_Id,
    });

    if (!worker) {
        return res.json({
            msg: "Worker not found",
        });
    }

    if(first_name !== ''){
        worker.first_name = first_name
    }
    if(last_name !== ''){
        worker.last_name = last_name
    }
    if(phone_number !== ''){
        worker.phone_number = phone_number
    }
    if(id_number !== ''){
        worker.id_number = id_number
    }
    if(working_section !== ''){
        worker.working_section = working_section
    }
    if(start_working_data !== ''){
        worker.start_working_data = start_working_data
    }
    if(finish_working_data !== ''){
        worker.finish_working_data = finish_working_data
    }if(reason_to_leave !== ''){
        worker.reason_to_leave = reason_to_leave
    }

    await worker.save();
    console.log(worker)
    return res.json(worker);
});


// Get All Workers Data
router.get("/api/get_workers",checkAuth, async (req, res) => {
    const worker = await Worker.find();
    return res.json(worker);
});

export { router as createWorkerRouter };
