import express from 'express';
import { checkAuth } from '../../middleware/checkAuth';
import { Village } from '../entities/village';
const router = express.Router();

// Adding New Village Info
router.post('/api/create_village', checkAuth, async (req, res) => {
  const { village_name } = req.body;

  const village = await Village.findOne({ where: { village_name } });

  if (village) {
    return res.status(404).json({
      message:
        'There Is A village With The Enterd Village_Name, Please Enter A New Village Data'
    });
  } else {
    const village = Village.create({
      village_name
    });
    await village.save();
  }

  return res.json(village);
});

// Get All Villages Info
router.get('/api/get_villages', checkAuth, async (req, res) => {
  const village = await Village.find();
  return res.json(village);
});

export { router as createVillageRouter };
