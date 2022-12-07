import express from 'express';
import { Item } from '../entities/Item';
import { createQueryBuilder } from 'typeorm';
import { checkAuth } from '../../middleware/checkAuth';
import { Category } from '../entities/Category';
import { Village } from '../entities/village';
import { QrCodeItem } from '../entities/QrcodeItem';
const router = express.Router();

router.post(
  '/api/:village_Id/:category_title/:item_Title/create_qrcode',
  async (req, res) => {
    const { serial, image } = req.body;
    const { village_Id } = req.params;
    const { category_title } = req.params;
    const { item_Title } = req.params;

    const village = await Village.findOne({
      where: { id: village_Id }
    });
    if (!village)
      return res
        .status(404)
        .json({ message: 'Village Not Found, Please Enter A Valid village' });

    const category = await Category.findOne({
      where: { title: category_title }
    });

    if (!category)
      return res
        .status(404)
        .json({ message: 'Category Not Found, Please Enter A Valid category' });

    if (category) {
      category.items_count = category.items_count + 1;
      await category.save();
    }

    const item = await Item.findOne({
      where: { en_item_name: item_Title }
    });
    if (!item)
      return res
        .status(404)
        .json({ message: 'Item Not Found, Please Enter A Valid item' });

    const qrcodeItem = QrCodeItem.create({
      village_name: village.village_name,
      category_name: category.title,
      serial,
      image,
      item
    });

    await qrcodeItem.save();
    return res.json(qrcodeItem);
  }
);
// Get All Items in One Category After Checking If Village Valid
router.get('/api/:village_Id/qrcode_list', async (req, res) => {
  const { village_Id } = req.params;

  const village = await Village.findOne({ where: { id: village_Id } });
  if (!village)
    return res
      .status(404)
      .json({ message: 'Village Not Found, Please Enter A Valid Village' });

  const qrcodeList = await QrCodeItem.find({
    where: { village_name: village.village_name }
  });

  let allItemsCounter = qrcodeList.length;

  let goodItemsCounter = 0;
  for (let i = 0; i < qrcodeList?.length; i++) {
    if (qrcodeList[i].item_state === true) goodItemsCounter++;
  }

  let underRepairItemsCounter = 0;
  for (let i = 0; i < qrcodeList?.length; i++) {
    if (qrcodeList[i].item_state === false) underRepairItemsCounter++;
  }

  //   const percentage = (Number(allItemsCounter), Number(underRepairItemsCounter)) => {
  //     return (100 * allItemsCounter) / underRepairItemsCounter;
  //  }
  const percentage =
    // (100 * Number(allItemsCounter)) / Number(underRepairItemsCounter);
    (Number(goodItemsCounter) / Number(allItemsCounter)) * 100;

  const responseData = {
    village: village.village_name,
    allItemsCount: allItemsCounter,
    goodItemsCount: goodItemsCounter,
    underRepaitItemsCount: underRepairItemsCounter,
    percentage: percentage.toFixed(1),
    qrCodeList: qrcodeList
  };

  return res.json(responseData);
});

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
