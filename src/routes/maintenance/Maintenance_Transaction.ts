import express from "express";
import { Owner } from "../../entities/Owner";
import {
    MaintenanceTransaction,
    PaymentMethod,
} from "../../entities/maintenance/Maintenance_transaction";

const router = express.Router();
router.post("/api/maintenance/:ownerId/transaction", async (req, res) => {
    const { ownerId } = req.params;
    const { payment_Method, amount } = req.body;

    const owner = await Owner.findOneBy({
        id: parseInt(req.params.ownerId),
    });

    if (!owner) {
        return res.json({
            msg: "client not found",
        });
    }

    const transaction = MaintenanceTransaction.create({
        amount,
        type: payment_Method,
        owner,
    });
    await transaction.save();

    if (amount) {
        owner.Maintenance_fees = +owner.Maintenance_fees - +amount;
    } else {
        console.log("error accured");
    }

    await owner.save();
    return res.json({
        msg: "transaction successfly done",
    });
});

export { router as createMaintenanceTransactionRouter };
