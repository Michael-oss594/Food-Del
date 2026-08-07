import foodModel from '../models/foodModel.js';
import fs from 'fs'


// add food item

const addFood = async (req,res) => {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Image file missing' });
    }

    const normalizedBody = Object.entries(req.body || {}).reduce((acc, [key, value]) => {
        const trimmedKey = typeof key === 'string' ? key.trim() : key;
        if (!(trimmedKey in acc)) {
            acc[trimmedKey] = value;
        }
        return acc;
    }, {});

    const { name, description, price, category } = normalizedBody;
    const missing = [];
    if (!name) missing.push('name');
    if (!description) missing.push('description');
    if (!price) missing.push('price');
    if (!category) missing.push('category');

    if (missing.length > 0) {
        return res.status(400).json({ success: false, message: `Missing required fields: ${missing.join(', ')}` });
    }

    const image_filename = req.file.filename;
    const numericPrice = Number(price);

    const food = new foodModel({
        name,
        description,
        price: numericPrice,
        category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Error"})
    }
}

export { addFood };