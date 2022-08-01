import Category from '../models/categories'
import slugify from 'slugify';
import Product from '../models/products';


export const create = async (req, res) => {
    req.body.slug = slugify(req.body.name);
    try {
        const category = await new Category(req.body).save()
        res.json(category);    
    } catch (error) {
        res.status(400).json({
            message: "Thêm danh mục không thành công"
        })
    }
}

export const list = async (req, res) => {
    try {
        const categories = await Category.find().exec();
        res.json(categories);    
    } catch (error) {
        res.status(400).json({
            message: "Lỗi"
        })
    }
}
export const read = async (req, res) => {
    try {
        const category = await Category.findOne({slug: req.params.slug}).exec();
        const products = await Product.find({category: category}).populate('category').select('-category').exec()
        console.log('products', products);
        res.json({
            category, products
        });    
    } catch (error) {
        res.status(400).json({
            message: "Lỗi"
        })
    }
  }
  export const remove = async (req, res) => { 
    try {
        const category = await Category.findOneAndDelete({slug: req.params.slug}).exec();
        res.json(category);
    } catch (error) {
        res.status(400).json({
            message: 'Remove category failed',
        });
    }
}
export const update = async (req, res) => { 
    const conditions = {slug: req.params.slug};
    const update = req.body;
    const optional = { new: true };
    try {
        const category = await Category.findOneAndUpdate(conditions, update, optional).exec();
        res.json(category);
    } catch (error) {
        res.status(400).json({
            message: "Update category failed",
        })
    }
}