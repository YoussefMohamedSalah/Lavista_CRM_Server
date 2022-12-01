import express from 'express';
import { Item } from '../entities/Item';
import { createQueryBuilder } from 'typeorm';
import { checkAuth } from '../../middleware/checkAuth';
import { Category } from '../entities/Category';
import { Village } from '../entities/village';
import { QrCodeItem } from '../entities/QrcodeItem';
const router = express.Router();

router.post(
  '/api/:village_Id/:category_Id/:item_Id/create_qrcode',
  async (req, res) => {
    const { serial, image } = req.body;
    const { village_Id } = req.params;
    const { category_Id } = req.params;
    const { item_Id } = req.params;

    const village = await Village.findOne({
      where: { id: village_Id }
    });
    if (!village)
      return res
        .status(404)
        .json({ message: 'Village Not Found, Please Enter A Valid village' });

    const category = await Category.findOne({
      where: { id: Number(category_Id) }
    });
    if (!category)
      return res
        .status(404)
        .json({ message: 'Category Not Found, Please Enter A Valid category' });

    const item = await Item.findOne({
      where: { id: item_Id }
    });
    if (!item)
      return res
        .status(404)
        .json({ message: 'Item Not Found, Please Enter A Valid item' });

    const qrcodeItem = QrCodeItem.create({
      serial,
      image,
      item
    });

    await qrcodeItem.save();
    return res.json(qrcodeItem);
  }
);

// Get All Items in One Category After Checking If Village Valid
router.get(
  '/api/:village_Id/:category_Id/item',
  checkAuth,
  async (req, res) => {
    const { village_Id } = req.params;
    const { category_Id } = req.params;

    const village = await Village.findOne({ where: { id: village_Id } });
    if (!village)
      return res
        .status(404)
        .json({ message: 'Village Not Found, Please Enter A Valid Village' });

    const category = await Category.findOne({
      where: { id: Number(category_Id) }
    });
    if (!category)
      return res
        .status(404)
        .json({ message: 'Category Not Found, Please Enter A Valid category' });

    const villageItems = await createQueryBuilder('category')
      .select('category')
      .from(Category, 'category')
      .where('category.id = :category_Id', { category_Id })
      .leftJoinAndSelect('category.items', 'items')
      .getMany();

    return res.json(villageItems);
  }
);

// // Get All Items With Qr Code List
// router.get('/api/all_items/qrcode_list', checkAuth, async (req, res) => {
//   const item = await createQueryBuilder('item')
//     .select('item')
//     .from(Item, 'item')
//     .leftJoinAndSelect('item.qrCodeList', 'qrCodeList')
//     .getMany();

//   return res.json(item);
// });

export { router as create_qrcode };
