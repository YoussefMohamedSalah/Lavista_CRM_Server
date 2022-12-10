import express from 'express';
import { checkAuth } from '../../middleware/checkAuth';
import { Village } from '../entities/village';
const router = express.Router();

// Get All Villages Info
router.get(
  '/api/:village_Id/villages_maintenance_fees',

  async (req, res) => {
    const { village_Id } = req.params;
    const village = await Village.findOne({
      where: { id: village_Id }
    });

    if (!village)
      return res
        .status(404)
        .json({ message: 'Village Not Found, Please Enter A Valid Village' });

    const ownersList = await Village.findOne({
      where: { id: village_Id },
      relations: {
        owners: true
      }
    });

    const allFeesArray = ownersList?.owners.map((fee) => fee.maintenance_fees);

    return res.json(allFeesArray);
  }
);

export { router as managmentStatisticsRouter };
