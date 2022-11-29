import express from 'express';
import { Category } from '../entities/Category';
import { createQueryBuilder } from 'typeorm';
import { Item } from '../entities/Item';
import { checkAuth } from '../../middleware/checkAuth';
import { Village } from '../entities/village';

const router = express.Router();

// Post Request
router.post('/api/:village_Id/category', checkAuth, async (req, res) => {
  const { title, shortcut, section } = req.body;

  const { village_Id } = req.params;
  const village = await Village.findOne({ where: { id: village_Id } });
  if (!village)
    return res
      .status(404)
      .json({ message: 'Village Not Found, Please Enter A Valid Village' });

  const category = Category.create({
    title,
    shortcut,
    section,
    village
  });

  await category.save();
  return res.json(category);
});

// // Get All Ctegories with items
// router.get('/api/village_Id/category/', checkAuth, async (req, res) => {
//     const { village_Id } = req.params;
//   const village = await Village.findOne({ where: { id: Number(village_Id) } });
//   if (!village)
//     return res
//       .status(404)
//       .json({ message: 'Village Not Found, Please Enter A Valid Village' });

//     const category = await createQueryBuilder('category')
//     .select('category')
//     .from(Category, 'category')
//     .leftJoinAndSelect('category.items', 'items')
//     .getMany();

//   return res.json(category);
// });

// Get single category with items
router.get('/api/:category_title/items', checkAuth, async (req, res) => {
  const { category_title } = req.params;

  const category = await createQueryBuilder('category')
    .select('category')
    .from(Category, 'category')
    .where('category.title = :category_title', { category_title })
    .leftJoinAndSelect('category.items', 'items')
    .getMany();

  return res.json(category);
});

export { router as createCategoryRouter };
