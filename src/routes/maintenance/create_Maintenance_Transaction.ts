import express from "express";
import { Owner } from "../../entities/Owner";
import {
    MaintenanceTransaction,
    PaymentMethod,
} from "../../entities/maintenance/Maintenance_transaction";
import { checkAuth } from "../../../middleware/checkAuth";

const router = express.Router();

// Make A new Transaction
router.post(
    "/api/maintenance/:ownerId/transaction",
    checkAuth,
    async (req, res) => {
        const { ownerId } = req.params;
        const { payment_method, amount } = req.body;

        const owner = await Owner.findOneBy({
            id: req.params.ownerId,
        });

        console.log(owner);
        if (!owner) {
            return res.json({
                msg: "client not found",
            });
        }

        const transaction = MaintenanceTransaction.create({
            amount,
            type: payment_method,
            owner,
        });
        await transaction.save();

        if (owner.maintenance_fees <= 1000) {
            owner.status = "good";
        } else if (
            owner.maintenance_fees > 1000 &&
            owner.maintenance_fees < 5000
        ) {
            owner.status = "normal";
        } else if (owner.maintenance_fees >= 5000) {
            owner.status = "urgent";
        }

        // to update balance after Transaction
        if (amount <= owner.maintenance_fees) {
            owner.maintenance_fees = +owner.maintenance_fees - +amount;
        } else if (amount >= owner.maintenance_fees) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "You Are Trying To Pay More Then Required Maintenance Fees",
                    },
                ],
            });
        }

        await owner.save();
        return res.json({
            msg: "transaction successfly done",
        });
    }
);

export { router as createMaintenanceTransactionRouter };
