import Product from '../models/products';
import slugify from "slugify";

export const list = async (req, res) => {
    const limitNumber = 20;
    const limit = req.query.limit ? +req.query.limit : limitNumber;
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const order = req.query.order ? req.query.order : 'desc';
    try {
        const products = await Product.find().limit(limit).exec();
        res.json(products);
    }
    catch (error) {
        res.status(404).json({
            message: "Product not found",
        })
    }
  }
export const get = async (req, res) => {
    try {
        const products = await Product.findOne({_id: req.params.id }).exec();
        res.json(products);    
    } catch (error) {
        res.status(400).json({
            message: "Tìm sản phẩm không thành công"
        })
    }
}
export const getViaSlug = async (req, res) => {
    try {
        const products = await Product.findOne({slug: req.params.slug}).exec();
        console.log(Product.findOne({slug: req.params.slug}));
        res.json(products);    
    } catch (error) {
        res.status(400).json({
            message: "Đọc sản phẩm không thành công"
        })
    }
}
export const create = async (req, res) => {
    req.body.slug = slugify(req.body.name);
    console.log(req.body);
    try {
        const product = await new Product(req.body).save();
        res.json(product);    
    } catch (error) {
        res.status(400).json({
            message: "Add product failed"
        })
    }
}
export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete({_id: req.params.id}).exec();
        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: 'Remove product failed',
        });
    }
}
export const update = async (req, res) => {
    const conditions = {_id: req.params.id};
    const update = req.body;
    const optional = { new: true };
    try {
        const product = await Product.findByIdAndUpdate(conditions, update, optional).exec();
        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: "Update product failed",
        })
    }
}