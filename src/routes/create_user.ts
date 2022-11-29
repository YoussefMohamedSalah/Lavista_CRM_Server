import express from 'express';
import { Village } from '../entities/village';
import {
  Brackets,
  createQueryBuilder,
  getRepository,
  Repository
} from 'typeorm';
import { checkAuth } from '../../middleware/checkAuth';
import { User, UserTypes } from '../entities/User';
import { Owner } from '../entities/Owner';
import { MaintenanceTransaction } from '../entities/maintenance/Maintenance_transaction';
import { format } from 'path';
const router = express.Router();

// Add New User Or Admin
router.post('/api/:village_Id/create_user', async (req, res) => {
  const { first_name, last_name, user_type, manager_of } = req.body;

  const { village_Id } = req.params;
  const village = await Village.findOne({ where: { id: village_Id } });
  if (!village)
    return res
      .status(404)
      .json({ message: 'Village Not Found, Please Enter A Valid Village' });

  const user = User.create({
    first_name,
    last_name,
    user_type,
    manager_of,
    village
  });

  await user.save();
  return res.json(user);
});

// Get All Users Data
router.get('/api/get_users', async (req, res) => {
  const user = await User.find();
  return res.json(user);
});

// Get One user Data
router.get('/api/get_user/:user_Id', checkAuth, async (req, res) => {
  const { user_Id } = req.params;

  const user = await User.findOneBy({
    id: req.params.user_Id
  });
  console.log(user);
  return res.json(user);
});

// Get All Users Data To One Village
router.get('/api/:village_Id/get_users', checkAuth, async (req, res) => {
  const { village_Id } = req.params;

  const village = await createQueryBuilder('village')
    .select('village')
    .from(Village, 'village')
    .where('village.id = :village_Id', { village_Id })
    .leftJoinAndSelect('village.users', 'users')
    .getMany();

  return res.json(village);
});

export { router as createUserRouter };
