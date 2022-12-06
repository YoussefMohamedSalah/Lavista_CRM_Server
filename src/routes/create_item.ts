import express from 'express';
import { Item } from '../entities/Item';
import { createQueryBuilder } from 'typeorm';
import { checkAuth } from '../../middleware/checkAuth';
import { Category } from '../entities/Category';
import { Village } from '../entities/village';
const router = express.Router();

router.post('/api/:village_Id/:category_Id/create_item', async (req, res) => {
  const { en_item_name, ar_item_name } = req.body;
  const { village_Id } = req.params;
  const { category_Id } = req.params;

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

  const item = Item.create({
    en_item_name,
    ar_item_name,
    village,
    category
  });

  await item.save();
  return res.json(item);
});

// Get All Items in One Category After Checking If Village Valid
router.get('/api/:village_Id/get_items', async (req, res) => {
  const { village_Id } = req.params;

  const village = await Village.findOne({ where: { id: village_Id } });
  if (!village)
    return res
      .status(404)
      .json({ message: 'Village Not Found, Please Enter A Valid Village' });

  const villageItems = await createQueryBuilder('category')
    .select('category')
    .from(Category, 'category')
    .leftJoinAndSelect('category.items', 'items')
    .getMany();

  return res.json(villageItems);
});

// Get All Items in One Category After Checking If Village Valid
// Get single category with items
router.get('/api/:village_Id/:category_title/get_items', async (req, res) => {
  const { category_title } = req.params;
  const { village_Id } = req.params;
  const village = await Village.findOne({ where: { id: village_Id } });
  if (!village)
    return res
      .status(404)
      .json({ message: 'Village Not Found, Please Enter A Valid Village' });

  const categoryItems = await createQueryBuilder('category')
    .select('category')
    .from(Category, 'category')
    .where('category.title = :category_title', { category_title })
    .leftJoinAndSelect('category.items', 'items')
    .getOne();

  if (!categoryItems)
    return res
      .status(404)
      .json({ message: 'Category Not Found, Please Enter A Valid Category' });

  return res.json(categoryItems);
});

export { router as createItemRouter };
