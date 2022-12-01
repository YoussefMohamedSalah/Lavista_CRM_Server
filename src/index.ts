import { createConnection } from 'typeorm';
import express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
// entities
import { Village } from './entities/village';
// import { Section } from "./entities/Section";
import { Category } from './entities/Category';
import { Item } from './entities/Item';
import { User } from './entities/User';
import { Worker } from './entities/Worker';
import { Owner } from './entities/Owner';
// routes
import { createVillageRouter } from './routes/create_village';
// import { createSectionRouter } from "./routes/create_section";
import { createCategoryRouter } from './routes/create_category';
import { createItemRouter } from './routes/create_item';
import { createOwnerRouter } from './routes/create_owner';
import { createUserRouter } from './routes/create_user';
import { createWorkerRouter } from './routes/create_worker';
// auth
import { authRouter } from './routes/auth/auth';
// import { protectedRouter } from './routes/protected';
import { BrokenItem } from './entities/BrokenItem';
// import { createBrokenItemRouter } from './routes/create_broken_item';
import { MaintenanceTransaction } from './entities/maintenance/Maintenance_transaction';
import { createMaintenanceTransactionRouter } from './routes/maintenance/create_Maintenance_Transaction';
import { createImageUploadRouter } from './routes/uploadFile/uploadImage';
import { QrCodeItem } from './entities/QrcodeItem';
import { create_qrcode } from './routes/create_qrcode';
// constants
dotenv.config();
const app = express();

const main = async () => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'YoussefMai##',
      database: 'lavista_final',
      entities: [
        // sections and category
        // Section,
        Category,
        Item,
        QrCodeItem,
        BrokenItem,
        // ----
        // workers and Users
        Village,
        User,
        Worker,
        Owner,
        MaintenanceTransaction
      ],
      synchronize: true
    });

    console.log("You'r Now Cronnected To Database");

    app.use(express.json());
    app.use(Cors());
    // ----
    // app.use(createSectionRouter);
    app.use(createCategoryRouter);
    app.use(createItemRouter);
    // app.use(createBrokenItemRouter);
    // ----
    app.use(createOwnerRouter);
    app.use(createUserRouter);
    app.use(createWorkerRouter);
    app.use(createVillageRouter);
    app.use(createImageUploadRouter);
    app.use(create_qrcode);
    // ------
    app.use(createMaintenanceTransactionRouter);

    app.use('/auth', authRouter);
    // app.use(protectedRouter);

    app.listen(8080, () => {
      console.log('Now running on port 8080');
    });
  } catch (error) {
    console.error(error);
    throw new Error('Unable To Connect To Database');
  }
};
main();
