import express from 'express';
import { Category } from '../entities/Category';
import { createQueryBuilder } from 'typeorm';
import { Item } from '../entities/Item';
import { checkAuth } from '../../middleware/checkAuth';
import { Village } from '../entities/village';

const router = express.Router();

// Post Request
router.post('/api/:village_Id/create_category', async (req, res) => {
  const { title, shortcut } = req.body;

  const { village_Id } = req.params;
  const village = await Village.findOne({ where: { id: village_Id } });
  if (!village)
    return res
      .status(404)
      .json({ message: 'Village Not Found, Please Enter A Valid Village' });

  const category = Category.create({
    title,
    shortcut,
    village,
    village_id: village?.id
  });

  await category.save();
  return res.json(category);
});

router.get('/api/:village_Id/get_categories', async (req, res) => {
  const { village_Id } = req.params;
  const village = await Village.findOne({ where: { id: village_Id } });
  if (!village)
    return res
      .status(404)
      .json({ message: 'Village Not Found, Please Enter A Valid Village' });

  const villageItems = await Village.findOne({
    where: { id: village_Id },
    relations: {
      categories: true
    }
  });

  // const allData = villageItems?.leftJoinAndSelect()
  // i can use this too in some cases

  // const villageItems = await Village.getRepository()
  //   .createQueryBuilder('village') // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
  //   .where(`village.id = ${village_Id}`)
  //   .innerJoinAndSelect('village.categories', 'categories')
  //   .leftJoinAndSelect('village.items', 'items')
  //   .getMany();

  return res.json(villageItems);
});

router.get('/api/:village_Id/get_categories/items', async (req, res) => {
  const { village_Id } = req.params;
  const village = await Village.findOne({ where: { id: village_Id } });
  if (!village)
    return res
      .status(404)
      .json({ message: 'Village Not Found, Please Enter A Valid Village' });

  const categoriesItems = await Category.find({
    where: { village_id: village_Id },
    relations: {
      items: true
    }
  });

  // const allData = villageItems?.leftJoinAndSelect()
  // i can use this too in some cases

  // const villageItems = await Village.getRepository()
  //   .createQueryBuilder('village') // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
  //   .where(`village.id = ${village_Id}`)
  //   .innerJoinAndSelect('village.categories', 'categories')
  //   .leftJoinAndSelect('village.items', 'items')
  //   .getMany();

  return res.json(categoriesItems);
});

export { router as createCategoryRouter };
