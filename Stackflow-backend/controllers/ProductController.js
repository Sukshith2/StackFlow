const Product = require("./ProductController");

const getStockStatus = (stock, minStock) =>{

    if(stock === 0){
         return "Out of Stock";
    }
    if (stock <= minStock){
        return "Low Stock";
    }
    return "In Stock";

} 

const getProduct = async (req, res) =>{
    try {
        const products = await productModel.find().sort({ createdAt : -1});

        res.status(200).json({success :true, count : products.length, products});
        
    } catch (error) {
         res.status(500).json({
      success: false,
      message: error.message,
    });
        
    }
}


const createProduct  = async (req, res) => {

try {
    
const {name, category, sku, price, stock, minStock, status} = req.body;
    const product = await Product.create({name, category, sku, price, stock, minStock, status: getStockStatus(Number(stock), Number(minStock))});

res.status(201).json({success : true, product});
} catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "SKU already exists",
      });

    }

        res.status(400).json({
      success: false,
      message: error.message,
    });

}
};


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const updateProduct = async (req, res) => {
    try {
        const {name, category, sku, price, stock, minStock, status} = req.body;

        const product = await Product.findByIdAndUpdate(
            req.params.id,{name, category, sku, price, stock, minStock, status: getStockStatus(Number(stock), Number(minStock))}, {new : true, runValidators : true});

            if(!product) {
                return res.status(404).json({
                    success : false,
                    message : "Product not found",
                });
            }

            res.status(200).json({success : true, product})


        
    } catch (error) {
        
    }

}


const deleteProduct = async (req, res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if(!product){
            res.status(404).json({success : false, message: "Product Not Found"});

        }

          res.status(200).json({success: true, message: "Product deleted successfully",});

    } catch (error) {
      res.status(500).json({ success: false, message: error.message,})
        
    }
}

module.exports = {getProduct, createProduct, updateProduct, deleteProduct, getProductById};