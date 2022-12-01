import express from 'express';
import dotenv from 'dotenv';
import { check, validationResult } from 'express-validator';
import { User } from '../../entities/User';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { Worker } from '../../entities/Worker';
import { Village } from '../../entities/village';

// constants
const router = express.Router();
dotenv.config();
const secretHash = process.env.SECRET_HASH;
router.post(
  '/signup/:village_Id',
  check('password', 'please provide a 7 characters or more password').isLength({
    min: 7,
    max: 20
  }),
  async (req: express.Request, res: express.Response) => {
    const { village_Id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const village = await Village.findOne({ where: { id: village_Id } });
    if (!village)
      return res
        .status(404)
        .json({ message: 'Village Not Found, Please Enter A Valid Village' });

    const {
      id,
      first_name,
      last_name,
      phone_number,
      loggin,
      password,
      permission_type
    } = req.body;

    // const userLoggin = await User.findOne({ where: { loggin } });
    // const worker = await Worker.findOne({ where: { id : id } });

    const userLoggin = await User.createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.loggin = :loggin', { loggin: loggin })
      .getOne();
    //   find If Id = To Any Worker Id To determand If It's Workers With Permissions Or Not
    const worker = await Worker.createQueryBuilder()
      .select('worker')
      .from(Worker, 'worker')
      .where('worker.id = :id', { id: id })
      .getOne();

    if (userLoggin) {
      return res.status(400).json({
        errors: [
          {
            msg: 'this user already exist'
          }
        ]
      });
    }
    // if worker data is the same as inserted and he is not user
    if (worker && !userLoggin) {
      worker.permission_type = permission_type;
      worker.has_permission = true;
      console.log(worker);
      // hassing our password
      const hashedPassword = await bcrypt.hash(password, 10);
      // create JWT
      const token = await JWT.sign(
        {
          loggin
        },
        `${secretHash}`,
        {
          // three hours
          expiresIn: 43200
        }
      );
      const userData = User.create({
        id,
        first_name,
        last_name,
        loggin,
        phone_number,
        password: hashedPassword,
        user_type: permission_type,
        villageId: village_Id,
        village
      });
      console.log('permission added to a worker');
      await userData.save();
      return res.json({
        access: token,
        id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        user_type: userData.user_type,
        manager_of: userData.manager_of,
        villageId: village_Id
      });
    } else if (!worker && !userLoggin) {
      // hassing our password
      const hashedPassword = await bcrypt.hash(password, 10);
      // create JWT
      const token = await JWT.sign(
        {
          loggin
        },
        `${secretHash}`,
        {
          // three hours
          expiresIn: 43200
        }
      );
      const userData = User.create({
        first_name,
        last_name,
        loggin,
        password: hashedPassword,
        user_type: permission_type,
        villageId: village_Id,
        village
      });
      console.log('village manager added');
      await userData.save();
      console.log('done');
      return res.json({
        access: token,
        id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        user_type: userData.user_type,
        manager_of: userData.manager_of,
        villageId: village_Id
      });
    }
    // sent JWT token to clinet side
    return res.json();
  }
);
// access token to be saved in locl storage ,,,, three Hours
router.post('/login', async (req, res) => {
  const { loggin, password } = req.body;

  const userLoggin = await User.createQueryBuilder()
    .select('user')
    .from(User, 'user')
    .where('user.loggin = :loggin', { loggin: loggin })
    .getOne();

  // const userType = await User.createQueryBuilder()
  // .select("user")
  // .from(User, "user")
  // .where("user.user_type = :user_type", { user_type: user_type })
  // .getOne();

  if (userLoggin) {
    const isMatch = await bcrypt.compare(password, userLoggin.password);

    if (!isMatch) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Invalid Credentials'
          }
        ]
      });
    } else {
      const token = await JWT.sign(
        {
          loggin
        },
        `${secretHash}`,
        {
          // three hours
          expiresIn: 43200
        }
      );
      res.header(token);
      return res.json({
        access: token,
        id: userLoggin.id,
        first_name: userLoggin.first_name,
        last_name: userLoggin.last_name,
        user_type: userLoggin.user_type,
        manager_of: userLoggin.manager_of,
        village_Id: userLoggin.villageId
      });
    }
  } else {
    return res.status(400).json({
      errors: [
        {
          msg: 'Invalid Credentials'
        }
      ]
    });
  }
});

export { router as authRouter };
