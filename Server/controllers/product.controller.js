import Product from "../models/product.model.js"


// add product
const addProduct = async(req,res) =>{
    const {title,catagory,imgUrl,shape,price,carat,colour,clarity,cut,polish,symmetry,fluorescence,table,depth,ratio,crownangle,crownheight,quantity} = req.body
    try {
        if(title && catagory && imgUrl && shape && price && carat && quantity ){
            const existproduct = await Product.findOne({title})
            if(existproduct){
                return res.status(400).json({error:"Product name alredy exist"})
            }
            else{
              const newproduct = new Product({title,catagory,imgUrl,shape,price,carat,colour,clarity,cut,polish,symmetry,fluorescence,table,depth,ratio,crownangle,crownheight,quantity})  
                await newproduct.save()
                return res.status(200).json({
                    success:true,
                    message:"Added succesfully"
                })
            }
        }
        else{
            return res.status(400).json({error:"All fields are required "})
        }
        
    } catch (error) {
        return res.status(500).send(error.message)
        
    }
}

const getProductById = async(req,res) =>{
    const {productId} = req.params;
try {

    const product = await Product.findById(productId)
    return res.status(200).json({
        success:true,
        product
    })
    
} catch (error) {
    return res.status(500).send(error.message)
}
    
}



const getAllProduct = async(req,res) =>{
// console.log("req",req.user)
    try {
        const products = await Product.find()
        // console.log(products)
        return res.status(200).json({
            success:true,
            products
        })
        
    } catch (error) {
        console.log("EROROR",error)
        return res.status(500).send(error.message)
    }
}

const deleteProduct =async (req,res)=>{
    try {
        const {productId} = req.params;

       let existproduct = await Product.findById(productId)
        if(existproduct){
            await Product.findByIdAndDelete(productId)
            return res.status(200).json({
                success:true,
               message:"Deleted succesfully"
            })
            
        }
        else{
            res.status(400).json({error:"Product not exist"})
        }
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}   

const updateProductById = async(req,res)=>{
const {productId} = req.params;
    const {title,catagory,imgUrl,shape,price,carat,colour,clarity,cut,polish,symmetry,fluorescence,table,depth,ratio,crownangle,crownheight,quantity} = req.body
    try {
      let  existproduct = await Product.findById(productId)
        if(existproduct){
            await Product.findByIdAndUpdate(productId,{title,catagory,imgUrl,shape,price,carat,colour,clarity,cut,polish,symmetry,fluorescence,table,depth,ratio,crownangle,crownheight,quantity})
            return res.status(200).json({
                success:true,
                message:"Updated succesfully"
            })
            
        }
        else{
            res.status(400).json({error:"Product not exist"})
        }
        

    } catch (error) {
         return res.status(500).send(error.message)
    }
}

export {addProduct,updateProductById,deleteProduct,getAllProduct,getProductById}