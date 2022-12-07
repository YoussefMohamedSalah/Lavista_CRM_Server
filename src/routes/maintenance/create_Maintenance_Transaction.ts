import express from 'express';
import { Owner } from '../../entities/Owner';
import {
  MaintenanceTransaction,
  PaymentMethod
} from '../../entities/maintenance/Maintenance_transaction';
import { checkAuth } from '../../../middleware/checkAuth';
import { Village } from '../../entities/village';
import { Worker } from '../../entities/Worker';
import { createQueryBuilder } from 'typeorm';

const router = express.Router();

// Make A new Transaction
router.post(
  '/api/maintenance/:ownerId/:village_Id/:worker_Id/transaction',

  async (req, res) => {
    const { village_Id } = req.params;
    const { ownerId } = req.params;
    const { worker_Id } = req.params;

    const { payment_method, amount } = req.body;

    const village = await Village.findOneBy({
      id: village_Id
    });

    const owner = await Owner.findOneBy({
      id: ownerId
    });

    const worker = await Worker.findOneBy({
      id: worker_Id
    });

    if (!village) {
      return res.json({
        msg: 'Village not found'
      });
    }

    if (!owner) {
      return res.json({
        msg: 'client not found'
      });
    }

    if (!worker) {
      return res.json({
        msg: 'worker not found'
      });
    }

    // maintenance_before_transaction
    // maintenance_after_transaction

    const totalAfterTransaction =
      Number(owner.maintenance_fees) - Number(amount);
    const transaction = MaintenanceTransaction.create({
      amount,
      type: payment_method,
      owner,
      worker_name: `${worker.first_name} ${worker.last_name}`,
      worker_id: worker.id,
      owner_name: `${owner.first_name} ${owner.last_name}`,
      owner_id: owner.id,
      maintenance_before_transaction: Number(owner.maintenance_fees),
      maintenance_after_transaction: totalAfterTransaction,
      village,
      worker
    });
    await transaction.save();

    if (owner.maintenance_fees <= 1000) {
      owner.status = 'good';
    } else if (owner.maintenance_fees > 1000 && owner.maintenance_fees < 5000) {
      owner.status = 'normal';
    } else if (owner.maintenance_fees >= 5000) {
      owner.status = 'urgent';
    }

    // to update balance after Transaction
    if (amount <= owner.maintenance_fees) {
      owner.maintenance_fees = +owner.maintenance_fees - +amount;
    } else if (amount >= owner.maintenance_fees) {
      return res.status(400).json({
        errors: [
          {
            msg: 'You Are Trying To Pay More Then Required Maintenance Fees'
          }
        ]
      });
    }

    await owner.save();
    return res.json({
      msg: 'transaction successfly done'
    });
  }
);

router.get(
  '/api/maintenance/:village_Id/get_transactions',
  async (req, res) => {
    const { village_Id } = req.params;

    const village = await Village.findOne({ where: { id: village_Id } });

    if (!village)
      return res
        .status(404)
        .json({ message: 'Village Not Found, Please Enter A Valid Village' });

    const villageTransactions = await Village.findOne({
      where: { id: village_Id },
      relations: {
        maintenanceTransactions: true
      }
    });

    return res.json(villageTransactions);
  }
);

export { router as createMaintenanceTransactionRouter };
